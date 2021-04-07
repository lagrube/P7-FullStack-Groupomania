// MODULES
const mysql = require("../config/db");
const fs = require("fs"); // Permet de gérer les fichiers stockés

// MIDDLEWARE CREATE POST pour céer les messages
exports.createPost = (req, res, next) => {
  const userId = `${req.body.userId}`;
  const message = `${req.body.message}`;
  const lienUrl = `${req.body.lienUrl}`;
  const sqlPost =
    "INSERT INTO posts (user_id, date, message, lien_url) VALUE (?,NOW(),?,?)";
  const values = [userId, message, lienUrl];

  mysql.query(sqlPost, values, (err, result, field) => {
    err
      ? res.status(400).json({ err })
      : res.status(200).json({
          message: "Votre publication à été publié !",
        });
  });
};

// MIDDLEWARE GET ALL POSTS pour obtenir tous les messages
exports.getAllPosts = (req, res, next) => {
  mysql.query(
    "SELECT users.nom, users.prenom, posts.id, posts.user_id, posts.message, posts.date AS date FROM users INNER JOIN posts ON users.id = posts.user_id ORDER BY date DESC",
    (err, result, field) => {
      err
        ? res.status(400).json({ err })
        : res.status(200).json({
            message: "Affichage de toutes les publications !",
            result,
          });
    },
  );
};

// MIDDLEWARE GET ONE POST pour obtenir un message
exports.getOnePost = (req, res, next) => {
  mysql.query(
    `SELECT * FROM posts WHERE posts.id = ${req.params.id}`,
    (err, result, field) => {
      err
        ? res.status(400).json({ err })
        : res.status(200).json({
            message: "Affichage du post sélectionné !",
            result,
          });
    },
  );
};

// MIDDLEWARE PUT ONE POST pour modifier un message
exports.modifyOnePost = (req, res, next) => {
  mysql.query(
    `UPDATE posts SET message = '${req.body.message}', lien_url= ${req.body.lien_url} WHERE posts.id = ${req.params.id}`,
    (err, result, field) => {
      err ? res.status(400).json({ err }) : res.status(200).json(result);
    },
  );
};

// MIDDLEWARE DELETE POST pour supprimer les messages
exports.deletePost = (req, res, next) => {
  mysql.query(
    `DELETE FROM posts WHERE posts.id = ${req.params.id}`,
    (err, result, field) => {
      err
        ? res.status(400).json({ err })
        : res.status(200).json({
            message: `Suppression du post n° ${req.params.id}!`,
          });
    },
  );
};

// MIDDLEWARE GET ALL USER POSTS pour récupérer tout les post d'un seul utilisateur
exports.getUserPosts = (req, res, next) => {
  mysql.query(
    `SELECT * FROM posts WHERE posts.user_id = ${req.params.id}`,
    (err, result, field) => {
      err
        ? res.status(400).json({ err })
        : res.status(200).json({
            message: `Affichage des post de l'utilisateur !`,
            result,
          });
    },
  );
};

// MIDDLEWARE CREATE COMMENT pour créer un commentaire
exports.createComment = (req, res, next) => {
  const postId = `${req.params.id}`;
  const userId = `${req.body.userId}`;
  const message = `${req.body.message}`;
  const lienUrl = `${req.body.lienUrl}`;
  const sqlPost =
    "INSERT INTO commentaires (post_id, user_id, date, message, lien_url) VALUE (?,?,NOW(),?,?)";
  const values = [postId, userId, message, lienUrl];

  mysql.query(sqlPost, values, (err, result, field) => {
    err
      ? res.status(400).json({ err })
      : res.status(200).json({
          message: "Votre commentaire à été publié !",
        });
  });
};

// MIDDLEWARE GET ALL COMMENT
exports.getAllComments = (req, res, next) => {
  mysql.query(
    "SELECT commentaires.post_id, commentaires.user_id, users.prenom, users.nom, commentaires.message, commentaires.date AS date FROM users INNER JOIN commentaires ON users.id = commentaires.user_id ORDER BY date DESC",
    (error, result, field) => {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json(result);
    },
  );
};

// MIDDLEWARE DELETE COMMENT pour supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  mysql.query(
    `DELETE FROM commentaires WHERE id = ${req.params.id}`,
    (err, result, field) => {
      err
        ? res.status(400).json({ err })
        : res.status(200).json({
            message: "Votre commentaire à été supprimé !",
          });
    },
  );
};

// // MIDDLEWARE LIKE pour ajouter un like
// exports.like = (req, res, next) => {
//   mysql.query("INSERT INTO likes () ");
// };
