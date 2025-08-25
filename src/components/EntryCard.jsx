function EntryCard({ entry }) {
  return (
    <div className="card bg-grey shadow-md hover:shadow-xl transition-shadow">
      <figure>
        <img
          src={entry.image}
          alt={entry.title}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{entry.title}</h2>
        <p className="text-sm text-gray-500">
          {new Date(entry.date).toLocaleDateString("de-DE")}
        </p>
        <p className="line-clamp-2">{entry.content}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  );
}

export default EntryCard;
