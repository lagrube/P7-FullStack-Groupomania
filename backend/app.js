// MODULES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const expressSanitizer = require("express-sanitizer");

// IMPORTATION ROUTES
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// HELMET
app.use(helmet()); // Protège l'app en paramétrant des Headers (notamment contre les failles XSS)

// PARAMETRAGE DES HEADERS
app.use((req, res, next) => {
  // Evite les erreurs CORS
  // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");
  // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Set-Cookie",
  );
  res.header("Access-Control-Expose-Headers", "Set-Cookie");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// BODYPARSER
app.use(bodyParser.json()); // Rend le corps de la requête exploitable facilement
app.use(bodyParser.urlencoded({ extended: true }));

// SANITIZER
app.use(expressSanitizer()); // Protège contre les failles XSS

// ROUTES
app.use("/images", express.static(path.join(__dirname, "images")));
// Va servir les routes dédiées aux utilisateurs
app.use("/api/user", userRoutes);
// Va servir les routes dédiées aux messages
app.use("/api/post", postRoutes);

module.exports = app;
