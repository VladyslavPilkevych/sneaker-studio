interface CollectionsSidebarFiltersProps {
  selectedSilhouettes: string[];
  selectedMaterials: string[];
  selectedColorways: string[];
  priceRange: [number, number];
  onSilhouetteChange: (silhouette: string) => void;
  onMaterialChange: (material: string) => void;
  onColorwayChange: (colorway: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onReset: () => void;
}

const SILHOUETTES = [
  "AJ1 High Retro",
  "AJ3 Retro",
  "AJ4 Flight",
  "Dunk Low SB",
  "Air Max",
  "Air Force 1",
  "Training",
];
const MATERIALS = ["Premium Leather", "Hairy Suede", "Tech Mesh"];
const COLORWAYS = [
  { name: "red", class: "bg-red-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "black", class: "bg-black" },
  { name: "white", class: "bg-white border border-gray-200" },
  { name: "green", class: "bg-green-500" },
];

export function CollectionsSidebarFilters({
  selectedSilhouettes,
  selectedMaterials,
  selectedColorways,
  priceRange,
  onSilhouetteChange,
  onMaterialChange,
  onColorwayChange,
  onPriceRangeChange,
  onReset,
}: CollectionsSidebarFiltersProps) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold tracking-tight">Filters</h3>
          <button
            onClick={onReset}
            className="text-xs text-primary font-semibold uppercase tracking-wider hover:underline"
          >
            Reset
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          <details
            className="group border-b border-[#e7e7f3] dark:border-[#2d2d4a] py-4"
            open
          >
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#4c4c9a]">
                Silhouettes
              </span>
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-[#4c4c9a]">
                expand_more
              </span>
            </summary>
            <div className="mt-4 flex flex-col gap-3">
              {SILHOUETTES.map((silhouette) => (
                <label
                  key={silhouette}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    checked={selectedSilhouettes.includes(silhouette)}
                    onChange={() => onSilhouetteChange(silhouette)}
                    className="rounded border-[#cfcfe7] text-primary focus:ring-primary"
                    type="checkbox"
                  />
                  <span className="text-sm">{silhouette}</span>
                </label>
              ))}
            </div>
          </details>
          <details
            className="group border-b border-[#e7e7f3] dark:border-[#2d2d4a] py-4"
            open
          >
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#4c4c9a]">
                Materials
              </span>
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-[#4c4c9a]">
                expand_more
              </span>
            </summary>
            <div className="mt-4 flex flex-col gap-3">
              {MATERIALS.map((material) => (
                <label
                  key={material}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    checked={selectedMaterials.includes(material)}
                    onChange={() => onMaterialChange(material)}
                    className="rounded border-[#cfcfe7] text-primary focus:ring-primary"
                    type="checkbox"
                  />
                  <span className="text-sm">{material}</span>
                </label>
              ))}
            </div>
          </details>
          <details className="group border-b border-[#e7e7f3] dark:border-[#2d2d4a] py-4">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#4c4c9a]">
                Colorways
              </span>
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-[#4c4c9a]">
                expand_more
              </span>
            </summary>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {COLORWAYS.map((colorway) => (
                <div
                  key={colorway.name}
                  onClick={() => onColorwayChange(colorway.name)}
                  className={`size-8 rounded-full cursor-pointer border-2 transition-all ${
                    selectedColorways.includes(colorway.name)
                      ? "border-primary scale-110"
                      : "border-transparent hover:border-primary"
                  } ${colorway.class}`}
                ></div>
              ))}
            </div>
          </details>
          <details className="group border-b border-[#e7e7f3] dark:border-[#2d2d4a] py-4">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#4c4c9a]">
                Price Range
              </span>
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-[#4c4c9a]">
                expand_more
              </span>
            </summary>
            <div className="mt-4 px-2">
              <input
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                type="range"
                min="100"
                max="500"
                value={priceRange[1]}
                onChange={(e) =>
                  onPriceRangeChange([priceRange[0], parseInt(e.target.value)])
                }
              />
              <div className="flex justify-between mt-2 text-xs text-[#4c4c9a]">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </details>
        </div>
      </div>
    </aside>
  );
}
