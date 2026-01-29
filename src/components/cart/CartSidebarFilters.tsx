import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cart-store";

export function CartSidebarFilters() {
  const navigate = useNavigate();
  const { getTotalPrice, items } = useCartStore();

  const subtotal = getTotalPrice();
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const isEmpty = items.length === 0;

  return (
    <div className="w-full lg:w-[400px]">
      <div className="glass-panel sticky top-28 p-8 rounded-xl shadow-xl border border-white/40 dark:border-gray-800/50">
        <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2">
            <span>Shipping Progress</span>
            <span className="text-primary">Free!</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-full transition-all duration-700"></div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 italic text-center">
            Your order qualifies for complimentary premium shipping.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Premium Shipping</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Estimated Tax</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              ${tax.toFixed(2)}
            </span>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-end">
            <span className="text-lg font-bold">Total</span>
            <span className="text-3xl font-black text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="Promo Code"
              type="text"
            />
            <button className="px-5 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">
              Apply
            </button>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            disabled={isEmpty}
            className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
