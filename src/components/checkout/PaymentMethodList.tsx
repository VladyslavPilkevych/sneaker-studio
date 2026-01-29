import { type FC } from "react";

type PaymentMethod = "apple" | "google" | "paypal";

interface PaymentMethodListProps {
  selectedMethod: PaymentMethod | null;
  onSelectMethod: (method: PaymentMethod) => void;
}

export const PaymentMethodList: FC<PaymentMethodListProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  const methods: { id: PaymentMethod; label: string }[] = [
    { id: "apple", label: "Apple Pay" },
    { id: "google", label: "Google Pay" },
    { id: "paypal", label: "PayPal" },
  ];

  return (
    <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[180px]">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelectMethod(method.id)}
          className={`
            flex items-center justify-center
            rounded-lg h-12 px-5
            text-base font-bold leading-normal tracking-[0.015em]
            transition-all duration-200
            ${
              selectedMethod === method.id
                ? "bg-[#3b82f6] text-white shadow-lg shadow-blue-500/50 scale-105"
                : "bg-[#232f48] text-white hover:bg-[#2d3a54] hover:scale-102"
            }
          `}
        >
          <span className="truncate">{method.label}</span>
        </button>
      ))}
    </div>
  );
};
