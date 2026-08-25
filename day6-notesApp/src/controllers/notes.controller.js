const NotesModel = require("../models/notes.model");

const createNotesController = async (req, res) => {
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
};

const getAllNotesController = async (req, res) => {
  try {
    const allNotes = await NotesModel.find();

    return res.status(200).json({
      message: "notes fetched successfully!",
      notes: allNotes,
    });
  } catch (error) {
    console.log("Error in fetching notes", error);
  }
};

module.exports = { createNotesController, getAllNotesController };
