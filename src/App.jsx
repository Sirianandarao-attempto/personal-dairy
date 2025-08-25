import { useState } from "react";
import Header from "./components/Header";
import AddEntryButton from "./components/AddEntryButton";
import AddEntryWindow from "./components/AddEntryWindow";
import EntryList from './components/EntryList';

export default function App() {
  const [isAddOpen, setIsAddOpen] = useState(false); // controls the add-entry window visibility

  const [entries, setEntries] = useState([
    {
    id: 1,
    title: "My first day",
    date: "2025-08-25",
    image: "https://media.istockphoto.com/id/1427299116/de/foto/karpaten-im-sommer-in-der-d%C3%A4mmerung.jpg?s=1024x1024&w=is&k=20&c=HtfmhgiZb-DMvFIWvxUHmpA3SKvBLQ2xlif1R7IWRAE=",
    content: "dkfdkjfkdjfk"
    },
    {
    id: 2,
    title: "My second day",
    date: "2025-08-25",
    image: "https://media.istockphoto.com/id/1399490338/de/foto/luftaufnahme-der-kleinen-stadt-cassia-s%C3%BCdliches-minas-gerais-brasilien.jpg?s=1024x1024&w=is&k=20&c=QD81ISFD0JQgzWZ4CBbOqPo4PDRjAOaP5vvMoTmIOQ8=",
    content: "dkfdkjfkdjfk"
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
  
      <Header>
        <AddEntryButton onClick={() => setIsAddOpen(true)} />
      </Header>

      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          ✨ Your Personal Space ✨
        </h2>

        {/* List of entrys */}
        <EntryList entries={entries} />
      </main>

      {/* Modal for new entry */}
      <AddEntryWindow open={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
};