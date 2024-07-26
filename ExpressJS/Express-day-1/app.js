const express = require("express");
const path = require("path");

const app = express();

const postRoute = require("./routes/post");
const adminRoute = require("./routes/admin");

app.use(express.static(path.join(__dirname, "public")));

app.use( (req, res, next) => {
  console.log("I am middleware one");  
  next();
});

app.use("/post", (req, res, next) => {
  console.log("I am middleware two");
  next();
});

app.use(postRoute);
app.use("/admin", adminRoute);

app.listen(8000);
