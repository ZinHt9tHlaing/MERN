const express = require("express");
const path = require("path");
const app = express();
const postRoute = require("./routes/post");
const adminRoute = require("./routes/admin");
const PORT = 8080;

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("I am home middleware");
  next();
});

app.use("/post", (req, res, next) => {
  console.log("I am post middleware");
  next();
});

app.use(postRoute);
app.use("/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
