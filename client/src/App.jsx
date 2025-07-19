import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export default function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await api.get("/api/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (note) => {
    await api.post("/api/notes", note);
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 text-gray-800 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-10 drop-shadow-sm">
          📝 Simple Notes App
        </h1>

        <NoteForm onSubmit={addNote} />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-xl transition-all duration-200"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                {note.title}
              </h2>
              <p className="text-gray-700">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
