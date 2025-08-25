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
            className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
            aria-label="Close window"
          >
            Close
          </button>
        </div>

        {/* BODY AREA: placeholder for the upcoming form (Step 2/3) */}
        <div className="mt-4 text-sm text-gray-700">
          {/* FORM_PLACEHOLDER: the add-entry form will be placed here in the next steps. */}
          <p>
            Window body — the form fields (Title, Date, Image URL, Content) will
            be added here later.
          </p>
        </div>

        {/* FOOTER AREA: actions (kept minimal in Step 1) */}
        <div className="mt-5 flex justify-end gap-2">
          {/* ACTION_PLACEHOLDER: additional action buttons will be added here when the form exists. */}
          <button
            onClick={onClose}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
