import React, { useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import Notes from "./Components/Notes";

const App = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.title === "" || formData.description === "") {
      alert("missing either title or description");
      return;
    }

    const createNote = await axios.post(
      "http://localhost:3000/notes/create",
      formData,
    );
    console.log(createNote);

    setFormData({
      title: "",
      description: "",
    });
  };
  return (
    <main className="min-h-screen bg-[#f2f1ed] text-black">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 border-x border-black md:grid-cols-12">
        {/* Sidebar */}
        <aside className="border-b border-black p-6 md:col-span-3 md:border-r md:border-b-0">
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em]">
                Personal Archive
              </p>

              <h1 className="text-4xl font-black leading-none tracking-tighter">
                NOTES
                <span className="text-red-600">.</span>
              </h1>
            </div>

            <p className="mt-10 max-w-40 text-xs leading-5 text-neutral-600">
              Capture ideas.
              <br />
              Organize thoughts.
              <br />
              Keep what matters.
            </p>
          </div>
        </aside>

        {/* Main content */}
        <section className="md:col-span-9">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-black px-6 py-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              New Entry
            </span>

            <span className="text-xs font-medium">01 / NOTES</span>
          </header>

          {/* Form */}
          <div className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="max-w-3xl">
              <div className="border-t-4 border-black">
                <div className="grid border-b border-black md:grid-cols-[140px_1fr]">
                  <label className="border-b border-black p-4 text-xs font-bold uppercase tracking-[0.18em] md:border-r md:border-b-0">
                    Title
                  </label>

                  <input
                    onChange={handleChange}
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Untitled note"
                    className="bg-transparent p-4 text-2xl font-bold outline-none placeholder:text-neutral-400 md:text-3xl"
                  />
                </div>

                <div className="grid border-b border-black md:grid-cols-[140px_1fr]">
                  <label className="border-b border-black p-4 text-xs font-bold uppercase tracking-[0.18em] md:border-r md:border-b-0">
                    Description
                  </label>

                  <textarea
                    onChange={handleChange}
                    rows="6"
                    name="description"
                    value={formData.description}
                    minLength={20}
                    placeholder="Write something worth remembering..."
                    className="resize-none bg-transparent p-4 text-base leading-7 outline-none placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-3 bg-black px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-600"
                >
                  <Plus size={18} />
                  Add Note
                </button>
              </div>
            </form>
          </div>

          <Notes />
        </section>
      </div>
    </main>
  );
};

export default App;
