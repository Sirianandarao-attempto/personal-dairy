export default function AddEntryButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open new entry window"
      className="
        group inline-flex items-center gap-3 rounded-2xl px-5 py-2.5
        text-sm font-medium text-slate-700
        ring-1 ring-inset ring-slate-200/70
        shadow-[0_2px_10px_rgba(15,23,42,0.06)]
        backdrop-blur transition hover:-translate-y-0.5
        hover:shadow-[0_6px_20px_rgba(15,23,42,0.10)]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200
        bg-[linear-gradient(135deg,theme(colors.pink.100),theme(colors.violet.100),theme(colors.sky.100))]
        hover:bg-[linear-gradient(135deg,theme(colors.pink.200),theme(colors.violet.200),theme(colors.sky.200))]
      "
    >
      {/* soft circle + rounded plus */}
      <span
        className="
          grid place-items-center h-7 w-7 rounded-full
          bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(248,250,252,0.85))]
          ring-1 ring-inset ring-slate-200/70
          shadow-[inset_0_1px_0_rgba(255,255,255,.7)]
          transition
        "
      >
        <svg
          className="h-4.5 w-4.5 text-slate-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 6v12M6 12h12" />
        </svg>
      </span>

      <span className="tracking-tight">New Entry</span>
    </button>
  );
}
