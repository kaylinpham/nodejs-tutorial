const http = require("http");
// const server = http.createServer();
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

//in real world application, we do not use 'connection' event to build server, it is low level
// server.on("connection", (socket) => {
//   console.log("New connection");
// });

server.listen(8000);
console.log("Listening on port 8000...");
