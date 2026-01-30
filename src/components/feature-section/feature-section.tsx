export function FeatureSection() {
  return (
    <section className="w-full bg-surface-light dark:bg-background-dark py-20 px-6 md:px-12 lg:px-24 border-t border-gray-100 dark:border-[#2d2d4a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
              Design without limits.
            </h2>
            <p className="text-text-muted text-lg max-w-xl">
              Our browser-based studio brings desktop-class 3D rendering to your
              fingertips.
            </p>
          </div>
          <a
            href="#"
            className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            View full feature list{" "}
            <span className="material-symbols-outlined text-lg">→</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-2xl bg-background-light hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-soft transition-all duration-300">
            <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl">
                texture
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">
              Material Library
            </h3>
            <p className="text-text-muted leading-relaxed">
              Access over 500+ premium leather, suede, and synthetic fabric
              scans.
            </p>
          </div>
          <div className="group p-8 rounded-2xl bg-background-light hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-soft transition-all duration-300">
            <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl">
                view_in_ar
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">
              AR Preview
            </h3>
            <p className="text-text-muted leading-relaxed">
              Instantly visualize your custom design on your feet using our AR
              app.
            </p>
          </div>
          <div className="group p-8 rounded-2xl bg-background-light hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-soft transition-all duration-300">
            <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl">
                download
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">
              Production Ready
            </h3>
            <p className="text-text-muted leading-relaxed">
              Export manufacturing-ready patterns and OBJ files for your
              workshop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
