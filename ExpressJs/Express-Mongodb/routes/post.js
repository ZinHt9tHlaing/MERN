const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");
const userController = require("../controllers/user");

const { isPremium } = require("../middleware/is-premium");

router.get("/", postController.renderHomePage);

router.get("/post/:postId", postController.getDetailPost);

router.get("/save/:id", isPremium, postController.savePostAsPDF);

router.get("/profile/:id", userController.getPublicProfile);

module.exports = router;
