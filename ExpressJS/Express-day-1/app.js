const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const postRoute = require("./routes/post");
const router = require("./routes/admin");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/post", (req, res, next) => {
  console.log("I am middleware one");
  next();
});

app.use((req, res, next) => {
  console.log("I am parent middleware");
  next();
});

app.use("/admin", (req, res, next) => {
  console.log("admin middleware approved!");
  next();
});

app.use(postRoute);
app.use("/admin", router);

app.listen(8000, () => console.log("http://localhost:8000"));
