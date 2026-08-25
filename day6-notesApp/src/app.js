const express = require("express");
const app = express();
const connectDB = require("./config/db");

const notesRoute = require("./routes/notes.route");

connectDB();

app.use(express.json());

// app.post("/create", createNotesController);
// app.get("/", getAllNotesController);
app.use("/notes", notesRoute);

module.exports = app;
