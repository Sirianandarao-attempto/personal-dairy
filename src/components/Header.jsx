export default function Header({ children }) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Personal Diary</h1>
        {children}
      </div>
    </header>
  );
}
