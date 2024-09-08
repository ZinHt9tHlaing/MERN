const express = require("express");
const path = require("path");
const app = express();
const postRoute = require("./routes/post");
const router = require("./routes/admin");
const db = require('./utils/db')

const bodyParser = require("body-parser");

const sequelize = require("./utils/db")

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("I am Parent middleware");
  next();
});

app.use("/post", (req, res, next) => {
  console.log("I am post middleware");
  next();
});

app.use("/admin", (req, res, next) => {
  console.log("Admin middleware approved!");
  next();
});

app.use("/admin", router);
app.use(postRoute);

const PORT = 8080;
sequelize.sync().then(result => {
  // console.log(result);
  app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
  });
}).catch(err => console.log(err))
