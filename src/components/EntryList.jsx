import EntryCard from "./EntryCard";

export default function EntryList({ entries, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} onSelect={onSelect} />
      ))}
    </div>
  );
}
