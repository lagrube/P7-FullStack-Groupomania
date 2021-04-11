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

// PARAMETRAGE DES HEADERS
app.use((req, res, next) => {
  // Evite les erreurs CORS
  // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

// BODYPARSER
app.use(bodyParser.json()); // Rend le corps de la requête exploitable facilement
app.use(bodyParser.urlencoded({ extended: true }));

// HELMET
app.use(helmet()); // Protège l'app en paramétrant des Headers (notamment contre les failles XSS)

// SANITIZER
app.use(expressSanitizer()); // Protège contre les failles XSS

// Va servir les routes dédiées aux utilisateurs
app.use("/api/user", userRoutes);
// Va servir les routes dédiées aux messages
app.use("/api/post", postRoutes);

// // ROUTES
// app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
