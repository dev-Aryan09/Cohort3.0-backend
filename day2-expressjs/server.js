const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    return res.end(" Response from /...");
  }
  if (req.url === "/about") {
    return res.end(" Response from about...");
  }
  if (req.url === "/contact") {
    return res.end(" Response from contact...");
  }
});

server.listen(3000, () => {
  console.log("Server is running at port 3000");
});
