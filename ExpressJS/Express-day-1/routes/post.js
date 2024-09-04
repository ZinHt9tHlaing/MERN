const express = require("express");
const path = require("path");
const { posts } = require("./admin");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(posts);
  // res.sendFile(path.join(__dirname, "..", "views", "homePage.html"));
  // express-day-1/routes/views/homePage.html
  res.render("home", { title: "Home Page", postArr: posts });
});

router.get("/post", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "postPage.html"));
});

module.exports = router;
