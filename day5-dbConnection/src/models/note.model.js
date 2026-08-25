const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    minLength: [10, "Minimun lenght should be 10 characters"],
  },
});

const NotesModel = mongoose.model("note", notesSchema);

module.exports = NotesModel;
