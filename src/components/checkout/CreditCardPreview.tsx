import { type FC } from "react";

interface CreditCardPreviewProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  isFlipped: boolean;
}

export const CreditCardPreview: FC<CreditCardPreviewProps> = ({
  cardNumber,
  cardholderName,
  expiryDate,
  cvv,
  isFlipped,
}) => {
  const formatCardNumber = (num: string) => {
    const cleaned = num.replace(/\s/g, "");
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.join(" ").padEnd(19, "•");
  };

  const displayCardNumber = cardNumber
    ? formatCardNumber(cardNumber)
    : "•••• •••• •••• ••••";
  const displayName = cardholderName || "CARDHOLDER NAME";
  const displayExpiry = expiryDate || "MM/YY";
  const displayCvv = cvv || "•••";

  return (
    <div className="w-full max-w-[400px] mx-auto perspective-1000">
      <div
        className={`
          relative w-full
          transition-transform duration-700
          transform-style-3d
          ${isFlipped ? "rotate-y-180" : ""}
        `}
        style={{
          aspectRatio: "1.586",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded opacity-80"></div>
              <div className="text-white text-xs font-semibold tracking-wider">
                VISA
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-white text-xl md:text-2xl font-mono tracking-widest">
                {displayCardNumber}
              </div>

              <div className="flex justify-between items-end">
                <div className="flex-1">
                  <div className="text-[#92a4c9] text-[10px] uppercase tracking-wide mb-1">
                    Cardholder
                  </div>
                  <div className="text-white text-sm md:text-base font-semibold uppercase tracking-wide truncate">
                    {displayName}
                  </div>
                </div>

                <div className="ml-4">
                  <div className="text-[#92a4c9] text-[10px] uppercase tracking-wide mb-1">
                    Expires
                  </div>
                  <div className="text-white text-sm md:text-base font-semibold tracking-wide">
                    {displayExpiry}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl rotate-y-180"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa]">
            <div className="w-full h-12 bg-black/60 mt-6"></div>

            <div className="px-6 mt-6">
              <div className="bg-white/90 rounded h-10 flex items-center justify-end px-4">
                <span className="text-black font-mono text-lg tracking-widest">
                  {displayCvv}
                </span>
              </div>

              <div className="mt-4 text-[10px] text-white/70 leading-relaxed">
                This card is property of [Bank Name]. Misuse is criminal
                offense. If found, please return to issuer.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
