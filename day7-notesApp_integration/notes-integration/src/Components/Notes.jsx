import { useContext, useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";
import { MyContext } from "../context/MyContext";

const Notes = () => {
  const { allNotes } = useContext(MyContext);

 
  return (
    <section className="border-t border-black">
      {/* Section heading */}
      <div className="flex items-end justify-between border-b border-black py-5">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]">
            Archive
          </p>

          <h2 className="text-4xl font-black tracking-tighter">
            YOUR NOTES<span className="text-red-600">.</span>
          </h2>
        </div>

        <span className="text-xs font-bold">
          {String(allNotes.length).padStart(2, "0")} ITEMS
        </span>
      </div>

      {/* Notes */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 py-8 sm:grid-cols-2 xl:grid-cols-3">
        {allNotes.map((note, index) => (
          <NoteCard
            key={note._id}
            note={note}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Notes;
