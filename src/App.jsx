import { useState } from "react";
import Header from "./components/Header";
import AddEntryButton from "./components/AddEntryButton";
import AddEntryWindow from "./components/AddEntryWindow";

export default function App() {
  const [isAddOpen, setIsAddOpen] = useState(false); // controls the add-entry window visibility

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Header>
        <AddEntryButton onClick={() => setIsAddOpen(true)} />
      </Header>

      <main className="max-w-3xl mx-auto p-6">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">✨ Your Personal Space ✨</h2>
          <p className="mt-2 text-sm text-gray-600">
            This is Step 1: header with a New Entry button that opens a clean
            window. No form yet.
          </p>
        </section>
      </main>

      <AddEntryWindow open={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
}
