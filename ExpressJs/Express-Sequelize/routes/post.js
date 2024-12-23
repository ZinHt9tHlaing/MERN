const express = require("express");
const path = require("path");
const router = express.Router();
const postController = require("../controllers/posts");

router.get("/", postController.getPosts);

router.get("/post/:postId", postController.getPostById);

module.exports = router;
