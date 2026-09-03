import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  console.log("context rendering...");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [updateNoteId, setUpdateNoteId] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/notes/");
      setAllNotes(res.data.notes);
    } catch (error) {
      console.log("Error in fetching all notes", error);
    }
  };

  const handleCreateNote = async () => {
    try {
      await axios.post("http://localhost:3000/notes/create", formData);
      getAllNotes();
    } catch (error) {
      console.log("Error is creating note", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/notes/${id}`);
      getAllNotes();
    } catch (error) {
      console.log("Error in deleting note", error);
    }
  };

  // fill note data in form which we want to update
  const noteForUpdate = async (note) => {
    setUpdateNoteId(note._id);
    setFormData({
      title: note.title,
      description: note.description,
    });
  };

  const handleNoteUpdate = async (id) => {
    // id -> updateNoteId
    try {
      await axios.put(`http://localhost:3000/notes/${id}`, formData);
      getAllNotes();
    } catch (error) {
      console.log("Error is creating note", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);
  return (
    <MyContext.Provider
      value={{
        formData,
        setFormData,
        handleCreateNote,
        allNotes,
        setAllNotes,
        handleDeleteNote,
        noteForUpdate,
        updateNoteId,
        handleNoteUpdate,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
