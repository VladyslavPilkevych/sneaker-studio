import { ShippingForm } from "@/components/checkout/ShippingForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function CheckoutPage() {
  return (
    <div
      className="relative flex w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden min-h-screen"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 flex-col justify-center py-5">
          <div className="mb-4">
            <Breadcrumbs />
          </div>
          <div className="flex gap-6 justify-center">
            <ShippingForm />
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
