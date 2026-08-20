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

// delete -> Delete
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const usersData = users.filter((val) => {
    return val.id !== id;
  });

  // updating users data so that it won't show deleted user
  users = usersData;

  res.send({
    message: "User deleted successfully!",
    users: users,
  });
});

// put -> Update
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // static update
  //   const updatedUser = users.map((val) => {
  //     return val.id === id ? { id, name: "Shery", age: 8 } : val;
  //   });

  const updatedUser = users.map((val) => {
    return val.id === id ? { ...val, name } : val;
  });

  res.send(updatedUser);
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
