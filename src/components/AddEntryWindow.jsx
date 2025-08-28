import { useState } from "react";

export default function AddEntryWindow({ open, onClose, onSave }) {
  if (!open) return null;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  function resetForm() {
    setTitle("");
    setDate("");
    setImageUrl("");
    setContent("");
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

   // title, date, content are requird Image not
    if (!title.trim() || !date || !content.trim()) {
      setError("Please fill out all fields.");
      return;
    }
    // Transfer of data to onSave, which saves the entry in the state.
    const payload = {
      title: title.trim(),
      date,
      imageUrl: imageUrl.trim(),
      content: content.trim(),
    };

    const res = await (onSave ? onSave(payload) : { ok: true });

    if (res.ok) {
      resetForm();
      onClose();
    } else {
      setError(res.error || "Could not save. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-black font-semibold">New Entry</h2>
          <button
            onClick={onClose}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Close
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4 text-sm text-black"
        >
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label>Image URL (optional)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label>Content</label>
            <textarea
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-green-500 px-4 py-2 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
