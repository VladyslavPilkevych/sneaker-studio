export function Header() {
  return (
    <header className="w-full px-6 py-6 md:px-12 lg:px-24 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-primary">
          <span className="material-symbols-outlined text-[24px]">
            Sneaked Studio
          </span>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-10">
        <a
          href="#"
          className="text-text-main text-sm font-semibold hover:text-primary transition-colors"
        >
          Collections
        </a>
        <a
          href="#"
          className="text-text-main text-sm font-semibold hover:text-primary transition-colors"
        >
          Studio
        </a>
        <a
          href="#"
          className="text-text-main text-sm font-semibold hover:text-primary transition-colors"
        >
          Community
        </a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="hidden md:flex size-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined text-text-main">
            search
          </span>
        </button>
        <button className="hidden md:flex size-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined text-text-main">🛒</span>
        </button>
        <button className="flex items-center justify-center rounded-lg bg-text-main px-5 py-2.5 text-white text-sm font-bold hover:bg-black transition-colors shadow-soft">
          Sign In
        </button>
      </div>
    </header>
  );
}
