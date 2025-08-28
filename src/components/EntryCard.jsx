import { useState } from "react";


function EntryCard({ entry, onSelect }) {
  
  // Default-Fallback-URL
  const fallbackUrl = "https://blog.tengrai.com/wp-content/uploads/2025/03/Mountain-Lake-m-920x518.webp";

  // Bildquelle: zuerst user-geliefertes Bild, sonst Fallback
  const [imgSrc, setImgSrc] = useState(entry.imageUrl || entry.image || fallbackUrl);

  const handleDetailsClick = () => {
    onSelect?.(entry);
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
          onError={() => setImgSrc(fallbackUrl)} 
        />
      </figure>

      <div className="card-body bg-[rgb(245,250,252)]">
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
