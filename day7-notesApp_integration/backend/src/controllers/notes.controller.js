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

const getSingleNoteController = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await NotesModel.findById(id);

    return res.status(200).json({
      message: "note fetched successfully!",
      note: note,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateNoteController = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedNote = await NotesModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.status(200).json({
      message: "note updated successfully!",
      note: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const singleEntityupdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedNote = await NotesModel.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    });

    return res.status(200).json({
      message: "note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const deleteNoteController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await NotesModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "note deleted successfully!",
      note: deletedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updateNoteController,
  deleteNoteController,
  singleEntityupdateController
};
