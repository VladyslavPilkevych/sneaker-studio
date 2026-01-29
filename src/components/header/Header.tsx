import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "@/store/cart-store";

export function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="w-full px-6 py-6 md:px-12 lg:px-24 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
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
              isActive ? "text-primary" : "text-text-main"
            }`
          }
        >
          Collections
        </NavLink>
        {/* <NavLink
          to="/studio"
          className={({ isActive }) =>
            `text-sm font-semibold hover:text-primary transition-colors ${
              isActive ? "text-primary" : "text-text-main"
            }`
          }
        >
          Studio
        </NavLink> */}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-sm font-semibold hover:text-primary transition-colors ${
              isActive ? "text-primary" : "text-text-main"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            `text-sm font-semibold hover:text-primary transition-colors ${
              isActive ? "text-primary" : "text-text-main"
            }`
          }
        >
          Reviews
        </NavLink>
      </nav>
      <div className="flex items-center gap-4">
        <button className="hidden md:flex size-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined text-text-main">
            search
          </span>
        </button>
        <Link
          to="/cart"
          className="relative hidden md:flex size-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined text-text-main">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
        <button className="flex items-center justify-center rounded-lg bg-text-main px-5 py-2.5 text-white text-sm font-bold hover:bg-black transition-colors shadow-soft">
          Sign In
        </button>
      </div>
    </header>
  );
}
