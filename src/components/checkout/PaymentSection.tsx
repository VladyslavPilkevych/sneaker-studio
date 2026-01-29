import { type FC, useState } from "react";
import { PaymentMethodList } from "./PaymentMethodList";
import { CreditCardPreview } from "./CreditCardPreview";
import { CardInputForm } from "./CardInputForm";

type PaymentMethod = "apple" | "google" | "paypal";

export const PaymentSection: FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const handleCvvFocus = () => setIsCardFlipped(true);
  const handleCvvBlur = () => setIsCardFlipped(false);

  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
        <div className="order-2 lg:order-1 w-full lg:w-auto">
          <PaymentMethodList
            selectedMethod={selectedMethod}
            onSelectMethod={setSelectedMethod}
          />
        </div>

        <div className="order-1 lg:order-2 flex items-center justify-center text-[#92a4c9] text-lg font-medium">
          or
        </div>

        <div className="order-3 lg:order-3 flex-1 w-full max-w-[500px] space-y-6">
          <div
            className="group cursor-pointer"
            onMouseEnter={() => setIsCardFlipped(true)}
            onMouseLeave={() =>
              !document.activeElement?.getAttribute("data-cvv") &&
              setIsCardFlipped(false)
            }
          >
            <CreditCardPreview
              cardNumber={cardNumber}
              cardholderName={cardholderName}
              expiryDate={expiryDate}
              cvv={cvv}
              isFlipped={isCardFlipped}
            />
          </div>

          <CardInputForm
            cardNumber={cardNumber}
            cardholderName={cardholderName}
            expiryDate={expiryDate}
            cvv={cvv}
            onCardNumberChange={setCardNumber}
            onCardholderNameChange={setCardholderName}
            onExpiryDateChange={setExpiryDate}
            onCvvChange={setCvv}
            onCvvFocus={handleCvvFocus}
            onCvvBlur={handleCvvBlur}
          />
        </div>
      </div>
    </div>
  );
};
