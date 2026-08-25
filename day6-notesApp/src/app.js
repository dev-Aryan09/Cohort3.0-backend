const express = require("express");
const app = express();
const connectDB = require("./config/db");
const {
  createNotesController,
  getAllNotesController,
} = require("./controllers/notes.controller");

connectDB();

app.use(express.json());

app.post("/create", createNotesController);

app.get("/", getAllNotesController);

module.exports = app;
