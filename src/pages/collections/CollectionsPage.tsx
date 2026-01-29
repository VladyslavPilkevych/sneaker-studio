import { useState, useEffect } from "react";
import { CollectionsSidebarFilters } from "@/components/collections/CollectionsSidebarFilters";
import { ProductCard } from "@/components/collections/ProductCard";
import { type Sneaker } from "@/data/models";

type SortOption = "newest" | "oldest" | "price-low" | "price-high";

export function CollectionsPage() {
  const [products, setProducts] = useState<Sneaker[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Sneaker[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [selectedSilhouettes, setSelectedSilhouettes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColorways, setSelectedColorways] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);

  useEffect(() => {
    fetch("/data/sneakers.json")
      .then((res) => res.json())
      .then((data: Sneaker[]) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedSilhouettes.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSilhouettes.includes(p.silhouette),
      );
    }

    if (selectedMaterials.length > 0) {
      filtered = filtered.filter((p) =>
        p.materials.some((m: string) => selectedMaterials.includes(m)),
      );
    }

    if (selectedColorways.length > 0) {
      filtered = filtered.filter((p) =>
        p.colorways.some((c: string) => selectedColorways.includes(c)),
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime(),
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.releaseDate).getTime() -
            new Date(b.releaseDate).getTime(),
        );
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [
    products,
    selectedSilhouettes,
    selectedMaterials,
    selectedColorways,
    priceRange,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleSilhouetteChange = (silhouette: string) => {
    setSelectedSilhouettes((prev) =>
      prev.includes(silhouette)
        ? prev.filter((s) => s !== silhouette)
        : [...prev, silhouette],
    );
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material],
    );
  };

  const handleColorwayChange = (colorway: string) => {
    setSelectedColorways((prev) =>
      prev.includes(colorway)
        ? prev.filter((c) => c !== colorway)
        : [...prev, colorway],
    );
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleReset = () => {
    setSelectedSilhouettes([]);
    setSelectedMaterials([]);
    setSelectedColorways([]);
    setPriceRange([100, 500]);
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "newest":
        return "Newest";
      case "oldest":
        return "Oldest";
      case "price-low":
        return "Lowest Price";
      case "price-high":
        return "Highest Price";
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="relative flex w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-[#0d0d1b] dark:text-[#f8f8fc]">
      <main className="flex flex-1 flex-col lg:flex-row px-6 lg:px-20 py-8 gap-10">
        <CollectionsSidebarFilters
          selectedSilhouettes={selectedSilhouettes}
          selectedMaterials={selectedMaterials}
          selectedColorways={selectedColorways}
          priceRange={priceRange}
          onSilhouetteChange={handleSilhouetteChange}
          onMaterialChange={handleMaterialChange}
          onColorwayChange={handleColorwayChange}
          onPriceRangeChange={handlePriceRangeChange}
          onReset={handleReset}
        />
        <section className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-10 pb-6 border-b border-[#e7e7f3] dark:border-[#2d2d4a]">
            <div className="flex flex-col gap-1">
              <nav className="flex items-center gap-2 text-xs text-[#4c4c9a] font-medium mb-2 uppercase tracking-tighter">
                <span>Home</span>
                <span className="material-symbols-outlined text-[12px]">
                  chevron_right
                </span>
                <span className="text-[#0d0d1b] dark:text-white">
                  Collections
                </span>
              </nav>
              <h1 className="text-4xl font-black tracking-tight">
                Sneaker Collections
              </h1>
              <p className="text-[#4c4c9a] dark:text-[#8a8ab9] text-base">
                {filteredProducts.length} Models available for 3D customization
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1a33] border border-[#e7e7f3] dark:border-[#2d2d4a] rounded-lg text-sm font-semibold">
                <span>Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="bg-transparent border-none outline-none cursor-pointer"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                </select>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1a33] border border-[#e7e7f3] dark:border-[#2d2d4a] rounded-lg text-sm font-semibold"
                >
                  <span>Sort by: {getSortLabel()}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    expand_more
                  </span>
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a33] border border-[#e7e7f3] dark:border-[#2d2d4a] rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSortBy("newest");
                        setShowSortDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#2d2d4a] rounded-t-lg"
                    >
                      Newest
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("oldest");
                        setShowSortDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#2d2d4a]"
                    >
                      Oldest
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("price-low");
                        setShowSortDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#2d2d4a]"
                    >
                      Lowest Price
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("price-high");
                        setShowSortDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#2d2d4a] rounded-b-lg"
                    >
                      Highest Price
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                imageAlt={product.imageAlt}
                title={product.name}
                price={product.price}
                badges={product.badges}
                colors={product.colors}
                glb={product.glb}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-[#4c4c9a]">
                No products found
              </p>
              <p className="text-sm text-[#4c4c9a] mt-2">
                Try adjusting your filters
              </p>
            </div>
          )}
          {filteredProducts.length > 0 && (
            <div className="mt-20 flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 text-sm font-medium">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="text-[#4c4c9a] flex items-center gap-1 hover:text-[#0d0d1b] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_back
                  </span>{" "}
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span key={`ellipsis-${index}`}>...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page as number)}
                        className={`size-8 flex items-center justify-center rounded-md ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "hover:bg-gray-200 dark:hover:bg-[#2d2d4a]"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="text-[#4c4c9a] flex items-center gap-1 hover:text-[#0d0d1b] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next{" "}
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
