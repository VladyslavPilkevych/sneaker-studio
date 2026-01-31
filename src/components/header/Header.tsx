import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCartStore } from "@/store/cart-store";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { SNEAKER_MODELS } from "@/data/models";
import allSneakersData from "../../../public/data/sneakers.json";

export function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const [searchResults, setSearchResults] = useState<typeof SNEAKER_MODELS>([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ALL_SNEAKERS = [
    ...SNEAKER_MODELS,
    ...allSneakersData.filter(
      (s) => !SNEAKER_MODELS.find((m) => m.id === s.id),
    ),
  ] as unknown as typeof SNEAKER_MODELS;

  useEffect(() => {
    if (debouncedQuery.trim()) {
      const query = debouncedQuery.toLowerCase().trim();
      const results = ALL_SNEAKERS.filter((model) =>
        model.name.toLowerCase().includes(query),
      ).slice(0, 5);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [debouncedQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/collections?search=${encodeURIComponent(
        searchQuery,
      )}`;
      setShowResults(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="w-full px-6 py-6 md:px-12 lg:px-24 flex items-center justify-between relative z-50">
      <Link to="/" className="flex items-center gap-3 relative z-50">
        <div className="text-primary">
          <span className="material-symbols-outlined text-[24px]">
            Sneaked Studio
          </span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-10">
        <NavLink
          to="/collections"
          className={({ isActive }) =>
            `text-sm font-semibold hover:text-primary transition-colors ${
              isActive ? "text-primary" : "text-text-main dark:text-white"
            }`
          }
        >
          Collections
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-sm font-semibold hover:text-primary transition-colors ${
              isActive ? "text-primary" : "text-text-main dark:text-white"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            `text-sm font-semibold hover:text-primary transition-colors ${
              isActive ? "text-primary" : "text-text-main dark:text-white"
            }`
          }
        >
          Reviews
        </NavLink>
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center"
          >
            <input
              ref={searchInputRef}
              name="search"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-0 focus:w-60 transition-all duration-300 absolute right-10 bg-white dark:bg-[#1a1a33] border border-gray-200 dark:border-[#2d2d4a] rounded-lg px-0 py-2 text-sm outline-none focus:px-4 focus:opacity-100 opacity-0 pointer-events-none focus:pointer-events-auto text-text-main dark:text-white placeholder:text-gray-400 shadow-sm"
              onBlur={(e) => {
                if (!e.target.value) {
                  e.target.classList.remove(
                    "w-60",
                    "px-4",
                    "opacity-100",
                    "pointer-events-auto",
                  );
                  e.target.classList.add(
                    "w-0",
                    "px-0",
                    "opacity-0",
                    "pointer-events-none",
                  );
                  setTimeout(() => setShowResults(false), 200);
                }
              }}
              id="header-search-input"
            />
            <label
              htmlFor="header-search-input"
              className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a33] transition-colors cursor-pointer z-10"
              onClick={() => {
                if (searchInputRef.current) {
                  const input = searchInputRef.current;
                  input.classList.remove(
                    "w-0",
                    "px-0",
                    "opacity-0",
                    "pointer-events-none",
                  );
                  input.classList.add(
                    "w-60",
                    "px-4",
                    "opacity-100",
                    "pointer-events-auto",
                  );
                  input.focus();
                }
              }}
            >
              <span className="material-symbols-outlined text-text-main dark:text-white">
                search
              </span>
            </label>
          </form>

          {showResults && searchResults.length > 0 && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#1a1a33] border border-gray-200 dark:border-[#2d2d4a] rounded-lg shadow-lg overflow-hidden z-[60]">
              {searchResults.map((sneaker) => (
                <Link
                  key={sneaker.id}
                  to={`/product/${sneaker.id}`}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-[#2d2d4a] transition-colors border-b last:border-0 border-gray-100 dark:border-[#2d2d4a]"
                  onClick={() => {
                    setShowResults(false);
                    setSearchQuery("");
                  }}
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-[#0f0f1d] rounded-md overflow-hidden flex items-center justify-center">
                    <img
                      src={sneaker.image}
                      alt={sneaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-text-main dark:text-white">
                      {sneaker.name}
                    </h4>
                    <span className="text-xs text-primary font-bold">
                      ${sneaker.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/cart"
          className="relative hidden md:flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a33] transition-colors"
        >
          <span className="material-symbols-outlined text-text-main dark:text-white">
            shopping_cart
          </span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
        <button
          onClick={toggleTheme}
          className="hidden md:flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a33] transition-colors"
        >
          {theme === "light" ? (
            <Moon className="size-5 text-text-main" />
          ) : (
            <Sun className="size-5 text-white" />
          )}
        </button>

        <button
          onClick={toggleMenu}
          className="md:hidden flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a33] transition-colors z-50 relative"
        >
          {isMenuOpen ? (
            <X className="size-6 text-text-main dark:text-white" />
          ) : (
            <Menu className="size-6 text-text-main dark:text-white" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-background-light dark:bg-background-dark z-40 flex flex-col pt-24 px-6 md:hidden overflow-y-auto">
          <div className="flex flex-col gap-6">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#1a1a33] border border-gray-200 dark:border-[#2d2d4a] rounded-lg px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary/20 text-text-main dark:text-white placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <span className="material-symbols-outlined text-text-main dark:text-white">
                  search
                </span>
              </button>
            </form>

            <nav className="flex flex-col gap-4">
              <NavLink
                to="/collections"
                className={({ isActive }) =>
                  `text-xl font-bold py-2 border-b border-gray-100 dark:border-[#2d2d4a] ${
                    isActive ? "text-primary" : "text-text-main dark:text-white"
                  }`
                }
              >
                Collections
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-xl font-bold py-2 border-b border-gray-100 dark:border-[#2d2d4a] ${
                    isActive ? "text-primary" : "text-text-main dark:text-white"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/reviews"
                className={({ isActive }) =>
                  `text-xl font-bold py-2 border-b border-gray-100 dark:border-[#2d2d4a] ${
                    isActive ? "text-primary" : "text-text-main dark:text-white"
                  }`
                }
              >
                Reviews
              </NavLink>
            </nav>

            <div className="flex items-center justify-between mt-4">
              <Link
                to="/cart"
                className="flex items-center gap-2 text-text-main dark:text-white font-medium"
              >
                <div className="relative size-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a1a33]">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span>Cart</span>
              </Link>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-text-main dark:text-white font-medium"
              >
                <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                <div className="size-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a1a33]">
                  {theme === "light" ? (
                    <Moon className="size-5" />
                  ) : (
                    <Sun className="size-5" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
