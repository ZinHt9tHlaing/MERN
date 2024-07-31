const express = require("express");
const path = require("path");
const { posts } = require("./admin");

const router = express.Router();

router.get("/", (req, res) => {
  // console.log("HomePage => " + posts);
  // res.sendFile(path.join(__dirname, "..", "views", "homePage.html"));
  res.render("home", { title: "Hello World", postsArr: posts });
});

router.get("/post", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "postPage.html"));
});

module.exports = router;
