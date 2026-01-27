export function CollectionsFooter() {
  return (
    <footer className="mt-20 border-t border-[#e7e7f3] dark:border-[#2d2d4a] py-12 px-6 lg:px-20 bg-white dark:bg-[#101022]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <h2 className="text-xl font-black uppercase tracking-tight mb-4">
            Sneakr-3D
          </h2>
          <p className="max-w-xs text-sm text-[#4c4c9a] dark:text-[#8a8ab9] leading-relaxed">
            The world's leading high-fidelity sneaker customization platform.
            Designed for creators, built by enthusiasts.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest mb-4">
            Support
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-[#4c4c9a]">
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Help Center
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                3D Guide
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Shipping
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest mb-4">
            Social
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-[#4c4c9a]">
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Instagram
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Discord
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-[#e7e7f3] dark:border-[#2d2d4a] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#4c4c9a]">
          © 2024 SNEAKR-3D. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-[#4c4c9a]">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
