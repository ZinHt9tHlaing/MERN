const fs = require("fs");
const note = "I am node module";

const requestHandler = (req, res) => {
  // if (res.url === "/") {
  res.setHeader("Content-Type", "text/html"); //Header;
  res.write("<html>");
  res.write("<head><title>Node Server</title></head>");
  res.write("<body><h1>I am Home Page.</h1></body>");
  res.write("</html>");
  fs.writeFileSync("Home.txt", "You visited Home Page");
  return res.end();
  // }

  // if (res.url === "/post") {
  //   res.setHeader("Content-Type", "text/html"); //Header;
  //   res.write("<html>");
  //   res.write("<head><title>Node Server</title></head>");
  //   res.write("<body><h1>I am Post Page.</h1></body>");
  //   res.write("</html>");
  // fs.writeFileSync("Page.txt","You visited Page Page");
  //   return res.end();
  // }
};

module.exports = { requestHandler, note };
