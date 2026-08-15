const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Hello I am server");
  res.end("Hello from server");
});

server.listen(3000, () => {
  console.log("Server is running at PORT 3000...");
});
