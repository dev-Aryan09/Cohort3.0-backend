const express = require("express");
const app = express();

// middleware for accepting text/JSON data
app.use(express.json());

let port = 3000;

let users = [];

// post -> Create
app.post("/create", (req, res) => {
  const body = req.body;

  users.push(body);

  res.send({
    message: "User create successfully!",
    user: body,
  });
});

// get -> Read
app.get("/", (req, res) => {
  res.send({
    message: "Users fetched successfully",
    users: users,
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
