function EntryCard({ entry, onSelect }) {
  // Use either `imageUrl` (new entries) or `image` (seed data)
  const imgSrc = entry.imageUrl || entry.image || "";

  const handleDetailsClick = () => {
    // notify parent about the selected entry
    onSelect?.(entry);

    // open the dialog imperatively (kept to match teammate's approach)
    const dlg = document.getElementById("entry_modal");
    if (dlg?.showModal) dlg.showModal();
  };

  return (
    <div className="card bg-gray-50 shadow-md hover:shadow-xl transition-shadow">
      <figure>
        <img
          src={imgSrc}
          alt={entry.title || "entry image"}
          className="h-48 w-full object-cover"
          // Fallback if the provided URL is not a direct image or hotlink is blocked
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/800/450?blur=2";
          }}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{entry.title}</h2>

        <p className="text-sm text-gray-500">
          {new Date(entry.date).toLocaleDateString("de-DE")}
        </p>

        <p className="line-clamp-2">{entry.content}</p>

        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleDetailsClick}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryCard;
