const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    minLength: 10,
  },
});

const NotesModel = mongoose.model("note", notesSchema);

module.exports = NotesModel;
