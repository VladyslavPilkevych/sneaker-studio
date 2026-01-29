import { type FC, type ChangeEvent } from "react";

interface CardInputFormProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  onCardNumberChange: (value: string) => void;
  onCardholderNameChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  onCvvFocus: () => void;
  onCvvBlur: () => void;
}

export const CardInputForm: FC<CardInputFormProps> = ({
  cardNumber,
  cardholderName,
  expiryDate,
  cvv,
  onCardNumberChange,
  onCardholderNameChange,
  onExpiryDateChange,
  onCvvChange,
  onCvvFocus,
  onCvvBlur,
}) => {
  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
      onCardNumberChange(formatted);
    }
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      let formatted = value;
      if (value.length >= 2) {
        formatted = value.slice(0, 2) + "/" + value.slice(2);
      }
      onExpiryDateChange(formatted);
    }
  };

  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      onCvvChange(value);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <label className="flex flex-col">
        <p className="text-white text-base font-medium leading-normal pb-2">
          Card Number
        </p>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={handleCardNumberChange}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324467] bg-[#192233] focus:border-[#3b82f6] h-14 placeholder:text-[#92a4c9] p-[15px] text-base font-normal leading-normal transition-colors"
        />
      </label>

      <label className="flex flex-col">
        <p className="text-white text-base font-medium leading-normal pb-2">
          Cardholder Name
        </p>
        <input
          type="text"
          placeholder="JOHN DOE"
          value={cardholderName}
          onChange={(e) => onCardholderNameChange(e.target.value.toUpperCase())}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324467] bg-[#192233] focus:border-[#3b82f6] h-14 placeholder:text-[#92a4c9] p-[15px] text-base font-normal leading-normal transition-colors uppercase"
        />
      </label>

      <div className="flex gap-4">
        <label className="flex flex-col flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            Expiry Date
          </p>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={handleExpiryChange}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324467] bg-[#192233] focus:border-[#3b82f6] h-14 placeholder:text-[#92a4c9] p-[15px] text-base font-normal leading-normal transition-colors"
          />
        </label>

        <label className="flex flex-col flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            CVV
          </p>
          <input
            type="text"
            placeholder="123"
            value={cvv}
            onChange={handleCvvChange}
            onFocus={onCvvFocus}
            onBlur={onCvvBlur}
            data-cvv="true"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324467] bg-[#192233] focus:border-[#3b82f6] h-14 placeholder:text-[#92a4c9] p-[15px] text-base font-normal leading-normal transition-colors"
          />
        </label>
      </div>
    </div>
  );
};
