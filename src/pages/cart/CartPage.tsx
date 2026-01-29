import { Link } from "react-router-dom";
import { CartSidebarFilters } from "@/components/cart/CartSidebarFilters";
import { ProductCard } from "@/components/cart/ProductCard";
import { useCartStore } from "@/store/cart-store";

const ACCESSORIES = [
  {
    id: "a1",
    name: "Premium Crew Socks",
    price: "$18.00",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxqPfOYYGc5UpKje_8JUq8mnGAllFYgt33gqP6O84in98VZInj0OiWQcdiSFamZYmV_53a7PGB1Esx31oL8JgHNM8Tbpseh2CZkCv9PiI3yvUQKLwqw2zPLXMtdu1iuRVe4nHqtWIMgIwB5T5Iu9uMAym5pAA6PS4IZXG01l_cyP_FPDKBvLUWaQrWd3ICkp7x2JTkub6Bz8zxuZ7LA1kyxPHEIG_Zg-bsOYM_aAaygmy_5imArbWeBy1-Og6tvatZhankXk5usr4",
  },
  {
    id: "a2",
    name: "Essentials Cleaning Kit",
    price: "$35.00",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDL8xd8l2Zj7-jiUZxJBSZMMl3uOronxdREPIxp7VQOleNd2dEmu8FU01V1RdvzyyuiE-qkxZznPpARfWC7HsIBg9REBnG5a6PINMpl2WadVaekMNS5fQiBBB7NcOfu9ypUmkjWrN9rJ8zJMEv5af6XIPLmYlF-OBwPBVxpHeQ-9DI17CuVhFBHmC8xmdEWLknqKVUcz0-JEfXYX4zmgFlTBGl6TrPR5HLAhq30VSXHt-VrEVqC4K2nQd6twEYRJbDVbYuom2Ao4G8",
  },
  {
    id: "a3",
    name: "Waxed Flat Laces",
    price: "$12.00",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkVEUAfT1ADbCPLQj2WKvtNPp3O2eRGdRo-cgxun6d7RboqPJv2xzxg0KH592VS1uURm43g22rhxOaLw3tasP99FMlQuPM5t8U4pXorSCudRmUIORIT0kHnmrTC28K1-7KgOMU2S7laV4bvqgunrBNMMep0jINfGcukgrYek-jVzYZYhj9k1YMyzydCzBMn7fzWs6TLKy0cry5wA5KFQWgGOo4oqRzrerznDDNmnIVQyH3JMQbNtxQuRVUXPNOCe7PXjKhjmbDnYg",
  },
  {
    id: "a4",
    name: "Cedar Shoe Trees",
    price: "$45.00",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgV_QkFLKhhvIe2mYoBy0UB_EQMKvj1eu4oN2AhPRIvnjlvyq0raqTBEvuMnzpJYjrAu3gkvkqzPYeC8ObhPngmpMNm3uwaFnwARIG9w5gVExgEclbgnHbFl8fHBKucOGyrzii9_8hX0ncO8Dcd8xbQRJe-DxSGM08iHlmRRLho_L06rS2LU-1mm-35TJh0vj5tq4G2rPyLX18oeMLFyFA3iEKHyvGcAEXDtkK1fYjujzHNCbSFllI_NGJsnr41gh7KQUPxKANqwM",
  },
  {
    id: "a5",
    name: "Acrylic Display Box",
    price: "$65.00",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhVBPXCZvrF0uWDfvfQbt4WQ988KtCyyfDnSOn1rfg6cXuF_RYJjENqW0fUyv0jLPBXF55JZrp8QSBLRK5TwqlbSoU0cJUOIUnCk8zmf7wLkHsP0hoHcque9GFM9tE53kTVSequiD0Ao2zeAawqhwZTh_CUO_5952e4cqWhF3_e3NHAGM78A6yc32WFi-Uur6w69Khukw8HEwUTCKYKDhuyaYIeECAdRbKPPx0eVmbuji_0YdTyjvbamaSRAjOFyz0qrPhfxI_ML8",
  },
];

export default function CartPage() {
  const { items } = useCartStore();
  const isEmpty = items.length === 0;

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d0d1b] dark:text-gray-100 font-body">
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10 font-display">
        <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-gray-500 dark:text-gray-400">
          <Link className="hover:text-primary transition-colors" to="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="text-gray-900 dark:text-gray-100">
            Shopping Cart
          </span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">Your Cart</h1>
          <p className="text-gray-500 mt-1">
            {isEmpty
              ? "Your cart is currently empty."
              : "Review your unique creations before final assembly."}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8">
            {isEmpty ? (
              <div className="py-20 text-center bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-700 mb-4">
                  shopping_cart_off
                </span>
                <p className="text-xl font-bold text-gray-400">
                  Nothing here yet
                </p>
                <Link
                  to="/collections"
                  className="mt-6 inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  price={item.price}
                  imageUrl={item.image}
                  quantity={item.quantity}
                  features={[
                    {
                      label: "Silhouette",
                      value: item.silhouette || "Classic",
                    },
                    {
                      label: "Material",
                      value: item.materials?.[0] || "Premium",
                    },
                  ]}
                />
              ))
            )}
          </div>

          <CartSidebarFilters />
        </div>

        <section className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Complete the Look
            </h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {ACCESSORIES.map((item, index) => (
              <div
                key={item.id}
                className={`group cursor-pointer ${index === 4 ? "hidden lg:block" : ""}`}
              >
                <div className="aspect-square bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 mb-4 p-4 flex items-center justify-center transition-transform group-hover:-translate-y-1">
                  <img
                    className="w-full h-full object-contain"
                    alt={item.name}
                    src={item.imageUrl}
                  />
                </div>
                <h4 className="font-bold text-sm">{item.name}</h4>
                <p className="text-gray-500 text-xs mt-1">{item.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
