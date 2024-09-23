const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

// controllers
const mongoose = require("mongoose");

// route
const postRoutes = require("./routes/post");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// models
const User = require("./models/user");

// views
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("66efe056b50bc6396a99e91d").then((foundUser) => {
    req.user = foundUser; // todo: custom request
    next();
  });
});

// routes middleware
app.use("/admin", adminRoutes);
app.use(postRoutes);
app.use(authRoutes);

const PORT = 8080;
mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server started on port http://localhost:${PORT}`);
    });
    return User.findOne().then((user) => {
      if (!user) {
        User.create({
          username: "coder",
          email: "admin@gmail.com",
          password: "12345",
        });
      }
      return user;
    });
  })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
