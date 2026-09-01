const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");

const notesRoute = require("./routes/notes.route");

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// app.post("/create", createNotesController);
// app.get("/", getAllNotesController);
app.use("/notes", notesRoute);

module.exports = app;
