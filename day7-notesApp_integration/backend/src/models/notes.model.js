const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "Minimum 10 characters required"],
  },
});

const NotesModel = mongoose.model("note", notesSchema);

module.exports = NotesModel;
