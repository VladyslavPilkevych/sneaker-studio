import { useCartStore } from "@/store/cart-store";

export function OrderSummary() {
  const { items, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="layout-content-container flex flex-col w-[360px]">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 bg-white dark:bg-[#111722] border-b border-[#e7e7f3] dark:border-[#2d2d4a] px-4 py-3 last:border-0"
        >
          <div
            className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg h-14 w-fit min-w-[56px]"
            style={{ backgroundImage: `url("${item.image}")` }}
          ></div>
          <div className="flex flex-col justify-center">
            <p className="text-[#0d0d1b] dark:text-white text-base font-medium leading-normal line-clamp-1">
              {item.name}
            </p>
            <p className="text-[#4c4c9a] dark:text-[#92a4c9] text-sm font-normal leading-normal line-clamp-2">
              Qty: {item.quantity} × ${item.price.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
      <div className="p-4">
        <div className="flex justify-between gap-x-6 py-2">
          <p className="text-[#4c4c9a] dark:text-[#92a4c9] text-sm font-normal leading-normal">
            Subtotal
          </p>
          <p className="text-[#0d0d1b] dark:text-white text-sm font-normal leading-normal text-right">
            ${subtotal.toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between gap-x-6 py-2">
          <p className="text-[#4c4c9a] dark:text-[#92a4c9] text-sm font-normal leading-normal">
            Shipping
          </p>
          <p className="text-[#0d0d1b] dark:text-white text-sm font-normal leading-normal text-right">
            Free
          </p>
        </div>
        <div className="flex justify-between gap-x-6 py-2">
          <p className="text-[#4c4c9a] dark:text-[#92a4c9] text-sm font-normal leading-normal">
            Taxes
          </p>
          <p className="text-[#0d0d1b] dark:text-white text-sm font-normal leading-normal text-right">
            ${tax.toFixed(2)}
          </p>
        </div>
      </div>
      <h1 className="text-[#0d0d1b] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
        Total: ${total.toFixed(2)}
      </h1>
      <div className="flex px-4 py-3">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-colors">
          <span className="truncate">Complete Purchase</span>
        </button>
      </div>
    </div>
  );
}
