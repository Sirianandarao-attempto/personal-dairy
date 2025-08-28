import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddEntryButton from "./components/AddEntryButton";
import AddEntryWindow from "./components/AddEntryWindow";
import EntryList from "./components/EntryList";
import DetailModal from "./components/DetailModal";

// LocalStorage Key
const STORAGE_KEY = "diary_entries_v1";

// Newst entry frist sorted by date
const sortByDateDesc = (list) => [...list].sort((a, b) => new Date(b.date) - new Date(a.date));

export default function App() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Entry state in local.storage
  const [entries, setEntries] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Failed to parse entries from localStorage", e);
    }
    // keine Seed-Daten, leer starten
    return [];
  });

  // add new entry
  function handleAddEntry(data) {
    const { title, date, imageUrl, content } = data;

    if (!title?.trim() || !date || !content?.trim()) {
      return { ok: false, error: "Please fill out all fields." };
    }

    // only one entry per day
    if (entries.some((e) => e.date === date)) {
      return { ok: false, error: "There is already an entry for this date." };
    }

    const newEntry = {
      id: Date.now(),
      title: title.trim(),
      date,
      imageUrl: imageUrl?.trim() || null,
      content: content.trim(),
    };

    // New Entry sorted by date
    setEntries((prev) => sortByDateDesc([newEntry, ...prev]));
    return { ok: true };
  }

  // Update handler für DetailModal
  const handleUpdate = (updatedEntry) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === updatedEntry.id ? updatedEntry : e))
    );
    setSelectedEntry(updatedEntry);
  };

  // Delete handler 
  const handleDelete = (entryId) => {
    setEntries((prev) => prev.filter((e) => e.id !== entryId));
    setSelectedEntry(null);
  };

  // Open modal if new entry gets selected
  useEffect(() => {
    if (selectedEntry) {
      const modal = document.getElementById("entry_modal");
      if (modal?.showModal) modal.showModal();
    }
  }, [selectedEntry]);

  // Saves entry for every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.warn("Failed to save entries to localStorage", e);
    }
  }, [entries]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Header>
        <AddEntryButton onClick={() => setIsAddOpen(true)} />
      </Header>

      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          ✨ Your Personal Space ✨
        </h2>

        <EntryList entries={entries} onSelect={setSelectedEntry} />
      </main>

      {/* Add Entry Window */}
      <AddEntryWindow
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAddEntry}
      />

      {/* Detail Modal */}
      <DetailModal
        entry={selectedEntry}
        modalId="entry_modal"
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
