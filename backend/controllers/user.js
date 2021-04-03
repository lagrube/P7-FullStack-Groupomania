// MODULES
const mysql = require("../config/db"); //Connexion à la bd
const bcrypt = require("bcrypt"); // Pour crypter le mot de passe
const jwt = require("jsonwebtoken"); // Génère un token sécurisé
const fs = require("fs"); // Permet de gérer les fichiers stockés

// MIDDLEWARE SIGNUP  - Inscription de l'utilisateur et hashage du mot de passe
exports.signup = (req, res, next) => {
  const email = req.body.email;
  const prenom = req.body.prenom;
  const nom = req.body.nom;

  if (
    email.length >= 5 &&
    req.body.password.length >= 8 &&
    prenom.length >= 3 &&
    nom.length >= 5
  ) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const password = hash;
        let sqlSignup;
        let values;

        sqlSignup =
          "INSERT INTO users (email, password, prenom, nom) VALUES (?,?,?,?)";
        values = [email, password, prenom, nom];

        mysql.query(
          `SELECT email FROM users WHERE email = "${email}"`,
          (err, result) => {
            if (result.length > 0)
              res.status(401).json({
                errorEmail: "Email déja utilisé",
              });
            else {
              mysql.query(sqlSignup, values, (err, result, field) => {
                err
                  ? res.status(500).json(err)
                  : res.status(201).json({
                      message: "Utilisateur créé !",
                    });
              });
            }
          },
        );
      })
      .catch((err) => res.status(500).json({ err }));
  } else {
    res.status(400).json({ errorForm: "Formulaire mal rempli!" });
  }
};

// MIDDLEWARE LOGIN avec vérification de l'email unique
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlFindUser =
    "SELECT id, nom, prenom, admin, password FROM users WHERE email = ?";

  //recherche de l'utilisateur dans la base de données
  mysql.query(sqlFindUser, [email], (err, result, field) => {
    result.length === 0
      ? res.status(401).json({ message: "email incorrect !" })
      : bcrypt //Si l'utilisateur existe, vérification du mot de passe
          .compare(password, result[0].password)
          .then((valid) => {
            //Si le mot de passe est incorrect
            if (!valid) {
              res.status(401).json({
                message: "Mot de passe incorrect !",
              });
            } else {
              res.status(200).json({
                userId: result[0].id,
                nom: result[0].nom,
                prenom: result[0].prenom,
                admin: result[0].admin,
                token: jwt.sign(
                  { userId: result[0].id },
                  process.env.JWT_TOKEN,
                  {
                    expiresIn: "24h",
                  },
                ),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
  });
};

// MIDDLEWARE PROFIL
exports.profil = (req, res, next) => {
  mysql.query(
    `SELECT prenom, nom, bio, image FROM users WHERE id = ${req.params.id}`,
    (err, result, field) => {
      err
        ? res.status(401).json({
            message: "Aucun utilisateur ne correspond à votre requête",
          })
        : res.status(200).json(result);
    },
  );
};

// MIDDLEWARE DELETE
exports.delete = (req, res, next) => {
  mysql.query(
    `DELETE FROM users WHERE id = ${req.params.id}`,
    (err, result, field) => {
      err
        ? res.status(400).json({ error })
        : res.status(200).json({ message: "Utilisateur supprimé!" });
    },
  );
};

// MIDDLEWARE MODIFY
exports.modify = (req, res, next) => {
  const email = req.body.email;
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const bio = req.body.bio;
  const newPassword = req.body.newPassword;
  let values;

  if (req.file) {
    console.log("dans if image");
    // Si le changement concerne l'avatar on update directement
    const userImage = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

    mysql.query(
      `SELECT image FROM users WHERE id = ${req.params.id}`,
      (err, result, field) => {
        if (err) {
          return res.status(500).json(err);
        }

        const filename = result[0].image.split("/images/")[1];

        filename !== "avatarUrl.pnj"
          ? fs.unlink(`images/${filename}`, () => {
              // On supprime le fichier
              mysql.query(
                `UPDATE users SET image = ? WHERE id = ${req.params.id}`,
                [userImage],
                (err, result, field) => {
                  err
                    ? res.status(500).json({ err })
                    : res.status(200).json({
                        message: "Image modifié !",
                      });
                },
              );
            })
          : mysql.query(
              `SELECT image FROM users WHERE id = ${req.params.id}`,
              [userImage],
              (err, result, field) => {
                err
                  ? res.status(500).json({ err })
                  : res.status(200).json({ message: "Image modifié !" });
              },
            );
      },
    );
  } else {
    console.log("pas d'image");
    if (newPassword) {
      console.log("dans else mdp");
      // Si un nouveau mdp est défini
      bcrypt
        .hash(newPassword, 10)
        .then((hash) => {
          values = [hash];
          mysql.query(
            `UPDATE users SET password=? WHERE id = ${req.params.id}`,
            values,
            (err, result) => {
              if (err) {
                return res.status(500).json(err);
              }
              if (result.affectedRows == 0) {
                return res.status(400).json({ message: "Changement échoué !" });
              }
              res.status(200).json({
                message: "Utilisateur modifé !",
              });
            },
          );
        })
        .catch((err) => res.status(500).json({ err }));
    } else {
      console.log("dans else !mdp");
      // Si le mdp reste le même
      values = [email, prenom, nom, bio];
      mysql.query(
        `UPDATE users SET email=?, prenom=?, nom=?, bio=? WHERE id = ${req.params.id}`,
        values,
        function (err, result) {
          if (err) {
            return res.status(500).json(err.message);
          }
          if (result.affectedRows == 0) {
            return res.status(400).json({ message: "Changement échoué !" });
          }
          res.status(200).json({
            message: `Bravo ${req.body.prenom} tu as modifié ton profil !`,
          });
        },
      );
    }
  }
};
