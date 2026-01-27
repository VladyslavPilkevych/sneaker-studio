import { Link, NavLink } from "react-router-dom";

export function CollectionsTopNav() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-[#e7e7f3] dark:border-[#2d2d4a] bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-3 lg:px-20">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-6 text-primary">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-[#0d0d1b] dark:text-white text-xl font-black leading-tight tracking-tight uppercase">
            Sneakr-3D
          </h2>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            to="/collections"
            className={({ isActive }) =>
              `text-sm font-medium hover:text-primary transition-colors ${
                isActive
                  ? "text-[#0d0d1b] dark:text-white"
                  : "text-[#4c4c9a] dark:text-[#8a8ab9]"
              }`
            }
          >
            Collections
          </NavLink>
          <NavLink
            to="/customizer"
            className={({ isActive }) =>
              `text-sm font-medium hover:text-primary transition-colors ${
                isActive
                  ? "text-[#0d0d1b] dark:text-white"
                  : "text-[#4c4c9a] dark:text-[#8a8ab9]"
              }`
            }
          >
            Customizer
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              `text-sm font-medium hover:text-primary transition-colors ${
                isActive
                  ? "text-[#0d0d1b] dark:text-white"
                  : "text-[#4c4c9a] dark:text-[#8a8ab9]"
              }`
            }
          >
            Community
          </NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c4c9a] text-[20px]">
            search
          </span>
          <input
            className="w-64 bg-transparent border-b border-[#cfcfe7] dark:border-[#2d2d4a] focus:border-primary focus:ring-0 text-sm py-2 pl-10 outline-none"
            placeholder="Find your silhouette..."
            type="text"
          />
        </div>
        <button className="flex items-center justify-center p-2 rounded-lg hover:bg-[#e7e7f3] dark:hover:bg-[#2d2d4a] transition-colors">
          <span className="material-symbols-outlined">favorite</span>
        </button>
        <button className="flex items-center justify-center p-2 rounded-lg hover:bg-[#e7e7f3] dark:hover:bg-[#2d2d4a] transition-colors relative">
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="absolute top-1 right-1 size-2 bg-primary rounded-full"></span>
        </button>
        <div
          className="size-8 rounded-full bg-cover bg-center border border-[#e7e7f3]"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtNL5gL7cpxKyv4ndlMweXOMjmeSFo3u4zOto2o8AmrNFeARKFzyrBe87dmiEGRWK3uj1bAiv03DKLZCoGv1ONn1rbXrJywAW0YnjNSocyJcEs7YobWdzdUI1PcJHKh5LHxe2f5I76n6VRJ6d72YlG_KsIlJdKXfR3pZf6HArSn5C6EIrOf-K19VGdGfxatv6ABsTEmxY9I_fjgnE3fBZNhzrVlvauNBZi0rH7O4K51eoH7j1TNAOWksuADINcClKS_2ncXvjNi44")`,
          }}
        ></div>
      </div>
    </header>
  );
}
