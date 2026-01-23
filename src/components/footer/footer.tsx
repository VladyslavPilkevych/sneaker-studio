export function Footer() {
  return (
    <footer className="bg-background-light border-t border-gray-200 px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-muted">
            © 2026 SneakerStudio Inc.
          </span>
        </div>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-sm text-text-muted hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-text-muted hover:text-primary transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-text-muted hover:text-primary transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
