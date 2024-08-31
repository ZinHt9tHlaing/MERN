const fs = require("fs");

const note = "I am node module";

const requestHandler = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Node Server</title><head/>");
    res.write("<body><h1>I am Home Page.</h1></body>");
    res.write("<html/>");
    fs.writeFileSync("home.txt", "You visited home page.");
    return res.end();
  }

  if (req.url === "/post") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Node Server</title><head/>");
    res.write("<body><h1>I am Post Page.</h1></body>");
    res.write("<html/>");
    fs.unlinkSync("home.txt");
    fs.writeFileSync("post.txt", "You visited post page.");
    return res.end();
  }
};

module.exports = { requestHandler, note };
