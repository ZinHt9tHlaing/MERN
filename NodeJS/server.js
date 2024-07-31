const http = require("http");
const { requestHandler, note } = require("./routes");

const routes = requestHandler;

const server = http.createServer(routes);
console.log(note);

server.listen(8000);

