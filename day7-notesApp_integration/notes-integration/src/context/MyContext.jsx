import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  console.log("context rendering...");
  const [allNotes, setAllNotes] = useState([]);
  console.log(allNotes);

  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/notes/");
      setAllNotes(res.data.notes);
    } catch (error) {
      console.log("Error in fetching all notes", error);
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

  useEffect(() => {
    getAllNotes();
  }, []);
  return (
    <MyContext.Provider value={{ allNotes, handleDeleteNote }}>
      {children}
    </MyContext.Provider>
  );
};
