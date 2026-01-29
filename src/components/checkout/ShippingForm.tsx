import { PaymentSection } from "./PaymentSection";

export function ShippingForm() {
  return (
    <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
      <div className="flex flex-wrap gap-2 p-4">
        <a
          className="text-[#92a4c9] text-base font-medium leading-normal"
          href="#"
        >
          Home
        </a>
        <span className="text-[#92a4c9] text-base font-medium leading-normal">
          /
        </span>
        <span className="text-white text-base font-medium leading-normal">
          Checkout
        </span>
      </div>
      <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
        Payment &amp; Shipping
      </h2>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Shipping Address
      </h2>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            Address
          </p>
          <input
            placeholder="Street address"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324467] bg-[#192233] focus:border-[#324467] h-14 placeholder:text-[#92a4c9] p-[15px] text-base font-normal leading-normal"
            defaultValue=""
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            Apt, suite, etc. (optional)
          </p>
          <input
            placeholder="Apt, suite, etc. (optional)"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324467] bg-[#192233] focus:border-[#324467] h-14 placeholder:text-[#92a4c9] p-[15px] text-base font-normal leading-normal"
            defaultValue=""
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            City
          </p>
          <input
            placeholder="City"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324467] bg-[#192233] focus:border-[#324467] h-14 placeholder:text-[#92a4c9] p-[15px] text-base font-normal leading-normal"
            defaultValue=""
          />
        </label>
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            Postal Code
          </p>
          <input
            placeholder="Postal Code"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324467] bg-[#192233] focus:border-[#324467] h-14 placeholder:text-[#92a4c9] p-[15px] text-base font-normal leading-normal"
            defaultValue=""
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            Country
          </p>
          <input
            placeholder="Country"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324467] bg-[#192233] focus:border-[#324467] h-14 placeholder:text-[#92a4c9] p-[15px] text-base font-normal leading-normal"
            defaultValue=""
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            Phone Number
          </p>
          <input
            placeholder="Phone Number"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324467] bg-[#192233] focus:border-[#324467] h-14 placeholder:text-[#92a4c9] p-[15px] text-base font-normal leading-normal"
            defaultValue=""
          />
        </label>
      </div>

      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Payment Method
      </h2>

      <PaymentSection />
    </div>
  );
}
