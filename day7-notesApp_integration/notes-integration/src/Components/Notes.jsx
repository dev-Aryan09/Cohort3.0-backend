import NoteCard from "./components/NoteCard";

const notes = [
  {
    id: 1,
    title: "Learn MongoDB",
    description:
      "Understand models, schemas, database connections and how Mongoose works with Express.",
  },
  {
    id: 2,
    title: "Project Ideas",
    description:
      "Build a minimal notes application with authentication and a clean Swiss-inspired interface.",
  },
  {
    id: 3,
    title: "Things to Remember",
    description:
      "Focus on consistency, responsive layouts and keeping components reusable.",
  },
];

const Notes = () => {
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
          {String(notes.length).padStart(2, "0")} ITEMS
        </span>
      </div>

      {/* Notes */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 py-8 sm:grid-cols-2 xl:grid-cols-3">
        {notes.map((note, index) => (
          <NoteCard key={note.id} note={note} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Notes;
