// MODULES - Routeur Express
const express = require("express");
const router = express.Router();

// IMPORTATION USER CONTROLLERS - Importe le controller
const postCtrl = require("../controllers/post");

// IMPORTATION MIDDLEWARES
const auth = require("../middleware/auth"); // Crée un token d'identification
const multer = require("../middleware/multer"); // Permet d'envoyer un fichier dans la requête

// ROUTES posts
router.get("/home/post", auth, postCtrl.getAllPosts);
router.get("/home/post/:id", auth, postCtrl.getOnePost);
router.get("/profil/:id/posts", auth, postCtrl.getUserPosts);
router.post("/home/post", auth, multer, postCtrl.createPost);
router.delete("/home/post/:id", auth, postCtrl.deletePost);
// router.post("/", /*auth,*/ postCtrl.like);

// ROUTES comments
router.get("/home/post/:id/comments", auth, postCtrl.getAllComments);
router.post("/home/post/:id/comment", auth, postCtrl.createComment);
router.delete("/home/post/comment/:id", auth, postCtrl.deleteComment);

module.exports = router;
