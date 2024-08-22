const http = require("http");

const app = require("./src/server");

const server = http.createServer(app);

server.listen(parseInt(3000, 10), () => {
  console.log(`Server started on port 3000`);
});

module.exports = server;
