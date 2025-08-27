import { useState, useEffect } from "react";

export default function DetailModal({ entry, modalId = "entry_modal", onUpdate, onDelete }) {
  const [title, setTitle] = useState(entry?.title || "");
  const [date, setDate] = useState(entry?.date || "");
  const [image, setImage] = useState(entry?.image || "");
  const [content, setContent] = useState(entry?.content || "");

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  
  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setDate(entry.date);
      setImage(entry.image);
      setContent(entry.content);
    }
  }, [entry]);

  // save
  const saveChanges = () => {
  if (onUpdate) {
    onUpdate({ ...entry, title, date, image, content });
  }

  const modal = document.getElementById(modalId); 
  if (modal) {
    modal.close(); 
    modal.classList.remove("modal-open"); 
  }
};
  // delete
  const handleDeleteClick = () => {
    if (entry && onDelete) {
      onDelete(entry.id);
      document.getElementById(modalId).close();
    }
  };

  if (!entry) return null;

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box bg-gray-300">
        <form method="dialog">
          {/* Close Button */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        {/* Title */}
        {isEditingTitle ? (
          <input
            className="input input-bordered w-full mb-2 bg-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
            autoFocus
          />
        ) : (
          <h3
            className="font-bold text-lg mb-2 cursor-pointer"
            onDoubleClick={() => setIsEditingTitle(true)}
          >
            {title}
          </h3>
        )}

        {/* Date */}
        {isEditingDate ? (
          <input
            type="date"
            className="input input-bordered w-full mb-2 bg-white"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onBlur={() => setIsEditingDate(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingDate(false)}
            autoFocus
          />
        ) : (
          <p
            className="text-sm text-gray-500 mb-4 cursor-pointer"
            onDoubleClick={() => setIsEditingDate(true)}
          >
            {new Date(date).toLocaleDateString("de-DE")}
          </p>
        )}

        {/* Image */}
        {isEditingImage ? (
          <input
            type="text"
            className="input input-bordered w-full mb-2 bg-white"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            onBlur={() => setIsEditingImage(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingImage(false)}
            autoFocus
          />
        ) : (
          <img
            src={image}
            alt={title}
            className="mb-4 rounded-lg cursor-pointer"
            onDoubleClick={() => setIsEditingImage(true)}
          />
        )}
        {/* Content */}
        {isEditingContent ? (
          <textarea
            className="text-gray-700 textarea-bordered w-full h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setIsEditingContent(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingContent(false)}
            autoFocus
          />
        ) : (
          <p
            className="text-gray-700 whitespace-pre-wrap break-words cursor-pointer"
            onDoubleClick={() => setIsEditingContent(true)}
          >
            {content}
          </p>
        )}
        

        {/* Buttons */}
        <div className="mt-4 flex justify-between ">
          <button type="button" className="btn bg-red-500 text-white border-red-500" onClick={handleDeleteClick}>
            Delete
          </button>
          <button type="button" className="btn btn-primary" onClick={saveChanges}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}
