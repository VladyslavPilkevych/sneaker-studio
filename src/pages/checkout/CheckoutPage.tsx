import { ShippingForm } from "@/components/checkout/ShippingForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export function CheckoutPage() {
  return (
    <div
      className="relative flex w-full flex-col bg-[#111722] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <ShippingForm />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
