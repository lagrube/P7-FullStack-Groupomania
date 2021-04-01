// MODULES - Routeur Express
const express = require("express");
const router = express.Router();

// IMPORTATION USER CONTROLLERS - Importe le controller
const userCtrl = require("../controllers/user");

// IMPORTATION MIDDLEWARES
const auth = require("../middleware/auth"); // Crée un token d'identification
const multer = require("../middleware/multer"); // Permet d'envoyer un fichier dans la requête

// ROUTE
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", /*auth,*/ userCtrl.profil);
router.put("/:id", auth, multer, userCtrl.modify);
router.delete("/:id", auth, userCtrl.delete);

module.exports = router;
