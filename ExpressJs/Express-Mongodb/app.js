const express = require("express");
const path = require("path");
const app = express();
const postRoute = require("./routes/post");
const router = require("./routes/admin");

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(postRoute);
app.use("/admin", router);

const PORT = 8080;
mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server started on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
