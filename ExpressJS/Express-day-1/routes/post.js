const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "homePage.html"));
    // express-day-1/routes/views/homePage.html
});

router.get("/post", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "postPage.html"));
});

module.exports = router;
