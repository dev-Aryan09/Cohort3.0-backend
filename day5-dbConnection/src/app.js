const express = require("express");
const app = express();
const connectDB = require("./config/db");
const NotesModel = require("./models/note.model");

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Okay, get it!!",
  });
});

app.post("/create", async (req, res) => {
  const { title, description } = req.body;

  const newNote = await NotesModel.create({
    title,
    description,
  });

  return res.send({
    success: true,
    message: "note created successfully!",
    note: newNote,
  });
});

module.exports = app;
