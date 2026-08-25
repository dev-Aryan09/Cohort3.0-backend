const express = require("express");
const app = express();
const connectDB = require("./config/db");
const NotesModel = require("./models/notes.model");

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK, got it!");
});

app.post("/create", async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = await NotesModel.create({
      title,
      description,
    });

    return res.status(201).json({
      message: "note created successfully!",
      note: newNote,
    });
  } catch (error) {
    console.log("Error in creating note", error);
  }
});

module.exports = app;
