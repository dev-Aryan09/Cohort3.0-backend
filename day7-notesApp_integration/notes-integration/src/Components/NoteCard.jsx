import { Pencil, Trash2 } from "lucide-react";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const NoteCard = ({ note, index }) => {
  const { handleDeleteNote } = useContext(MyContext);
  return (
    <article className="group flex min-h-70 flex-col border-t-4 border-black">
      {/* Meta */}
      <div className="flex items-center justify-between border-b border-black py-3">
        <span className="text-xs font-bold uppercase tracking-[0.18em]">
          Note
        </span>

        <span className="text-xs font-medium">
          #{String(index + 1).padStart(3, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col py-6">
        <h2 className="mb-4 text-2xl font-black leading-tight tracking-[-0.04em] md:text-3xl">
          {note.title}
        </h2>

        <p className="line-clamp-4 text-sm leading-6 text-neutral-600">
          {note.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex border-t border-black">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 border-r border-black py-3 text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white"
        >
          <Pencil size={14} />
          Edit
        </button>

        <button
          onClick={() => handleDeleteNote(note._id)}
          type="button"
          className="flex flex-1 items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:bg-red-600 hover:text-white"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </article>
  );
};

export default NoteCard;
