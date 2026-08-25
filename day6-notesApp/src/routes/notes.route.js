const express = require("express");
const {
  createNotesController,
  getAllNotesController,
} = require("../controllers/notes.controller");

const router = express.Router();

// create
router.post("/create", createNotesController);

// read
router.get("/", getAllNotesController);

module.exports = router;

// .
// .
// Router groups related endpoints together
// (like "/users", "/products", etc)
