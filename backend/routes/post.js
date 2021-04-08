// MODULES - Routeur Express
const express = require("express");
const router = express.Router();

// IMPORTATION USER CONTROLLERS - Importe le controller
const postCtrl = require("../controllers/post");

// IMPORTATION MIDDLEWARES
const auth = require("../middleware/auth"); // Crée un token d'identification
const multer = require("../middleware/multer"); // Permet d'envoyer un fichier dans la requête

// ROUTES posts
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/user/:id/posts", auth, postCtrl.getUserPosts);
router.put("/:id", auth, multer, postCtrl.modifyOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);

// ROUTES comments
router.get("/:id/comments", auth, postCtrl.getAllComments);
router.post("/:id/comment", auth, postCtrl.createComment);
router.delete("/comment/:id", auth, postCtrl.deleteComment);

module.exports = router;
