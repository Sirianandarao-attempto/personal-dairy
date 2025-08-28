import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddEntryButton from "./components/AddEntryButton";
import AddEntryWindow from "./components/AddEntryWindow";
import EntryList from "./components/EntryList";
import DetailModal from "./components/DetailModal";
// put this near the top of App.jsx (below imports)
  const STORAGE_KEY = "diary_entries_v1";
  
// helper (put it above the component)
const sortByDateDesc = (list) => [...list].sort((a,b) => new Date(b.date) - new Date(a.date));


export default function App() {
  const [isAddOpen, setIsAddOpen] = useState(false); // controls the add-entry window visibility
  const [selectedEntry, setSelectedEntry] = useState(null);

  // NOTE: seed data kept exactly as provided (including `image` key and same dates)
  // entries state: hydrate from localStorage first; fallback to current seed
  const [entries, setEntries] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    // fallback to teammate's current seed (kept as-is)
    return [
      {
        id: 1,
        title: "My first day",
        date: "2025-08-25",
        image:
          "https://media.istockphoto.com/id/1427299116/de/foto/karpaten-im-sommer-in-der-d%C3%A4mmerung.jpg?s=1024x1024&w=is&k=20&c=HtfmhgiZb-DMvFIWvxUHmpA3SKvBLQ2xlif1R7IWRAE=",
        content: "dkfdkjfkdjfk",
      },
      {
        id: 2,
        title: "My second day",
        date: "2025-08-25",
        image:
          "https://media.istockphoto.com/id/1399490338/de/foto/luftaufnahme-der-kleinen-stadt-cassia-s%C3%BCdliches-minas-gerais-brasilien.jpg?s=1024x1024&w=is&k=20&c=QD81ISFD0JQgzWZ4CBbOqPo4PDRjAOaP5vvMoTmIOQ8=",
        content: "dkfdkjfkdjfk",
      },
    ];
  });

  // Step 4: save handler with basic validation and one-entry-per-day check
  function handleAddEntry(data) {
    const { title, date, imageUrl, content } = data;

    // required fields
    if (!title?.trim() || !date || !imageUrl?.trim() || !content?.trim()) {
      return { ok: false, error: "Please fill out all fields." };
    }

    // one entry per day
    if (entries.some((e) => e.date === date)) {
      return { ok: false, error: "There is already an entry for this date." };
    }

    // append new entry
    const newEntry = {
      id: Date.now(),
      title: title.trim(),
      date,
      imageUrl: imageUrl.trim(),
      content: content.trim(),
    };

    // replace the line below
    setEntries((prev) => sortByDateDesc([...prev, newEntry]));
    return { ok: true };
  }

  // Update handler for DetailModal (kept as-is)
  const handleUpdate = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((e) => (e.id === updatedEntry.id ? updatedEntry : e))
    );
    setSelectedEntry(updatedEntry);
  };

  // Delete handler for DetailModal (kept as-is)
  const handleDelete = (entryId) => {
    setEntries((prev) => prev.filter((e) => e.id !== entryId));
    setSelectedEntry(null);
  };

  // Imperative dialog open (kept as-is to match teammate's approach)
  useEffect(() => {
    if (selectedEntry) {
      const modal = document.getElementById("entry_modal");
      if (modal) modal.showModal();
    }
  }, [selectedEntry]);
  ///////

  // load entries from localStorage on first mount (FR012)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setEntries(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to parse entries from localStorage", e);
    }
    // NOTE: if nothing in storage, we keep the current seed `entries` as-is.
    // This keeps teammate's initial objects intact on first run.
  }, []);

  // persist entries to localStorage whenever they change (FR008)
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

        {/* ENTRY LIST AREA */}
        <EntryList entries={entries} onSelect={setSelectedEntry} />
      </main>

      {/* ADD ENTRY WINDOW
          Minimal change: add `onSave={handleAddEntry}` so Step 4 connects the form to state */}
      <AddEntryWindow
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAddEntry}
      />

      {/* DETAILS MODAL (kept as-is) */}
      <DetailModal
        entry={selectedEntry}
        modalId="entry_modal"
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
