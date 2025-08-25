export default function AddEntryWindow({ open, onClose }) {
  if (!open) return null; // window hidden when 'open' is false

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      {/* OVERLAY: click to close */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* PANEL: this is the window content container */}
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

        {/* FORM */}
        <form className="mt-4 text-sm text-gray-700 space-y-4">
          {/* TITLE */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              placeholder="Mein Tag"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-1 font-medium">Image-URL</label>
            <input
              type="url"
              placeholder="https://..."
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Content</label>
            <textarea
              rows="4"
              placeholder="What happend?"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            ></textarea>
          </div>
        </form>

        {/* FOOTER AREA: actions (kept minimal in Step 1) */}
        <div className="mt-5 flex justify-end gap-2">
          {/* ACTION_PLACEHOLDER: additional action buttons will be added here when the form exists. */}
          <button
            onClick={onClose}
            className="rounded-xl bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Add 
          </button>
        </div>
      </div>
    </div>
  );
}
