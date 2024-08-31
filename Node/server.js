const http = require("http");
const { requestHandler, note } = require("./routes");

const server = http.createServer(requestHandler);
console.log(note);

server.listen(8000);
