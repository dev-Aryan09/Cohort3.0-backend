const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Okay, get it!!",
  });
});

app.post("/create", (req, res) => {
  const { title, description } = req.body;

  return res.send({
    message: "note created successfully!",
    note: {
      title,
      description,
    },
  });
});

module.exports = app;
