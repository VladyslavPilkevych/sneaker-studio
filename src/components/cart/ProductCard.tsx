import { useCartStore } from "@/store/cart-store";

interface ProductFeature {
  label: string;
  value: string;
}

export interface ProductCardProps {
  id: string;
  title: string;
  price: number | string;
  imageUrl: string;
  features: ProductFeature[];
  size?: string;
  sku?: string;
  quantity?: number;
}

export function ProductCard({
  id,
  title,
  price,
  imageUrl,
  features,
  size,
  quantity = 1,
}: ProductCardProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const formattedPrice =
    typeof price === "number" ? `$${price.toFixed(2)}` : price;

  return (
    <div className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row p-6 gap-6">
        <div className="w-full md:w-56 h-56 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{title}</h3>
              <span className="text-xl font-bold text-primary">
                {formattedPrice}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-gray-400 font-medium uppercase text-[10px] tracking-widest">
                    {feature.label}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {feature.value}
                  </span>
                </div>
              ))}
              {size && (
                <div className="flex flex-col mt-2">
                  <span className="text-gray-400 font-medium uppercase text-[10px] tracking-widest">
                    Size
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {size}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => updateQuantity(id, -1)}
                  className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-bold border-x border-gray-200 dark:border-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(id, 1)}
                  className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(id)}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-600 transition-colors underline underline-offset-4"
              >
                Remove
              </button>
            </div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:opacity-80 transition-opacity">
                <span className="material-symbols-outlined text-base">
                  edit_note
                </span>
                Edit Design
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
