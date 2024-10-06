// packages
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const session = require("express-session");
const MongodbStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
// const csrf = require("csurf");

// server
const app = express();

// controllers
const mongoose = require("mongoose");

const { isLogin } = require("./middleware/is-login");

// routes
const postRoutes = require("./routes/post");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// models
const User = require("./models/user");
const sessionStore = new MongodbStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

// const csrfProtect = csrf();

// views
app.set("view engine", "ejs");
app.set("views", "views");

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(flash());

// app.use(csrfProtect);

// custom middleware
app.use((req, res, next) => {
  if (req.session.isLogin === undefined) {
    return next();
  } else {
    User.findById(req.session.userInfo._id)
      .select("_id email")
      .then((foundUser) => {
        req.user = foundUser; // todo: custom request
        next();
      });
  }
});

// routes define
app.use("/admin", isLogin, adminRoutes);
app.use(postRoutes);
app.use(authRoutes);

// to send csrf token for every page render
// app.use((req, res, next) => {
//    res.locals.isLogIn = req.session.isLogin ? true : false;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

// database connect
const PORT = 8080;
mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server started on port http://localhost:${PORT}`);
    });
  })
  // .then((result) => console.log(result))
  .catch((err) => console.log(err));
