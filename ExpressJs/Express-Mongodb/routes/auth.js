const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

// render register page
router.get("/register", authController.getRegisterPage);

// handle register
router.post(
  "/register",
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject(
            "Email is already exists. Please enter another one."
          );
        }
      });
    }),
  body("password")
    .isLength({ min: 4 })
    .trim()
    .withMessage("Password must have minimum 4 characters."),
  authController.registerAccount
);

// render login page
router.get("/login", authController.getLoginPage);

// handle login
router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("password")
    .isLength({ min: 4 })
    .trim()
    .withMessage("Password must valid."),
  authController.postLoginData
);

// handle logout
router.post("/logout", authController.logout);

// render reset password page
router.get("/reset-password", authController.getResetPage);

// render feedback page
router.get("/feedback", authController.getFeedbackPage);

// send reset email
router.post(
  "/reset",
  body("email").isEmail().withMessage("Please enter a valid email address."),
  authController.resetLinkSend
);

// render change password page
router.get("/reset-password/:token", authController.getNewPasswordPage);

// change new password
router.post(
  "/change-new-password",
  body("password")
    .isLength({ min: 4 })
    .trim()
    .withMessage("Password must have minimum 4 characters."),
  body("confirm_password")
    .isLength({ min: 4 })
    .trim()
    .withMessage("Password Confirmation must have minimum 4 characters.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password must match!!");
      }
      return true;
    }),
  authController.changeNewPassword
);

module.exports = router;
