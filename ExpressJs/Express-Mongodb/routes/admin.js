const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const userController = require("../controllers/user");
const { body } = require("express-validator");

//  /admin/create-post
router.get("/create-post", postController.renderCreatePage);

router.post(
  "/",
  [
    body("title")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Title must have 10 letters."),
    body("description")
      .isLength({ min: 30 })
      .withMessage("Description must have 30 letters."),
  ],
  postController.createPost
);

router.get("/edit/:postId", postController.getEditPost);

router.post(
  "/edit-post",
  [
    body("title")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Title must have 10 letters."),
    body("description")
      .isLength({ min: 30 })
      .withMessage("Description must have 30 letters."),
  ],
  postController.updatePost
);

router.post("/delete/:postId", postController.deletePost);

router.get("/profile", userController.getProfile);

router.get("/username", userController.renderUsernamePage);

router.post(
  "/setUsername",
  body("username")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Username must have 4 letters."),
  userController.setUsername
);

router.get("/premium", userController.renderPremiumPage);

module.exports = router;
