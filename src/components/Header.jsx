export default function Header({ children }) {
  return (
    <header className="sticky top-0 z-10 border border-[0.5px] border-[#171C1EDE] backdrop-blur text-[#00687B] bg-[rgb(245,250,252)]">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex gap-3 align-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
        <h1 className="text-xl font-semibold tracking-tight">PERSONAL DIARY</h1>
        </div>
        {children}
      </div>
    </header>
  );
}
