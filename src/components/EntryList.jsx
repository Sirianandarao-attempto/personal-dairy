import EntryCard from "./EntryCard";

function EntryList({ entries }) {
  if (entries.length === 0) {
    return (
      <p className="text-center text-gray-500">
    
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

export default EntryList;
