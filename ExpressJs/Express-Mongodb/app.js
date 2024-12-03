// packages
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const session = require("express-session");
const MongodbStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
// const csrf = require("csurf");
const multer = require("multer");

// server
const app = express();

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

// controllers
const mongoose = require("mongoose");
const errorController = require("./controllers/error");

// const csrfProtect = csrf();

// views
app.set("view engine", "ejs");
app.set("views", "views");

// app.use(csrfProtect);

const storageConfigure = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: storageConfigure, fileFilter: fileFilterConfigure }).single(
    "photo"
  )
);
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(flash());

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

app.all("*", errorController.get404Page);

app.use(errorController.get500Page);

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
