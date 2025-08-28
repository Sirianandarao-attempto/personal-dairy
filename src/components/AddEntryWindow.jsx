import { useState } from "react";

export default function AddEntryWindow({ open, onClose, onSave }) {
  if (!open) return null; // window hidden when 'open' is false

  // --- FORM STATE ---
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(""); // YYYY-MM-DD from <input type="date">
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // clears the form after successful save
  function resetForm() {
    setTitle("");
    setDate("");
    setImageUrl("");
    setContent("");
    setError("");
  }

  // submit handler: validate and send to parent via onSave
  async function handleSubmit(e) {
    e.preventDefault();

    // basic validation (Step 4 requirement)
    if (!title.trim() || !date || !imageUrl.trim() || !content.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    // build payload for parent
    const payload = {
      title: title.trim(),
      date, // string used for duplicate-date check in parent
      imageUrl: imageUrl.trim(),
      content: content.trim(),
    };

    // call parent handler; parent returns { ok, error? }
    const res = await (onSave ? onSave(payload) : { ok: true });

    if (res?.ok) {
      resetForm();
      onClose();
    } else {
      setError(res?.error || "Could not save. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      {/* OVERLAY: click to close */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* PANEL: window content container */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border bg-white p-5 shadow-xl">
        {/* HEADER AREA: title + close button */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">New Entry</h2>
          <button
            onClick={onClose}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            aria-label="Close window"
          >
            Close
          </button>
        </div>

        {/* FORM AREA (Step 4) */}
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4 text-sm text-gray-700"
        >
          {/* ERROR BOX (shows validation / duplicate-date) */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          {/* TITLE */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              placeholder="Mein Tag"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* DATE */}
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="url"
              placeholder="https://..."
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block mb-1 font-medium">Content</label>
            <textarea
              rows="4"
              placeholder="What happened?"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* FOOTER ACTIONS */}
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
