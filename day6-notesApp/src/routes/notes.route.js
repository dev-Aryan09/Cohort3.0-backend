const express = require("express");
const {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updateNoteController,
  deleteNoteController,
} = require("../controllers/notes.controller");

const router = express.Router();

// CREATE
router.post("/create", createNotesController);

// READ
router.get("/", getAllNotesController);

// READ ONE
router.get("/:id", getSingleNoteController);

// UPDATE
router.put("/:id", updateNoteController);

// DELETE
router.delete("/:id", deleteNoteController);

module.exports = router;

// .
// .
// Router groups related endpoints together
// (like "/users", "/products", etc)
