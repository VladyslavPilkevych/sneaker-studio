import React from "react";

const AboutHero: React.FC = () => (
  <div className="@container">
    <div className="@[480px]:px-4 @[480px]:py-3">
      <div
        className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded min-h-80"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQJr68DeadnWoNI2194VzYmww_beA-IHaqgH7JMg6QVq7_Pu75J35eU77Y5OX8qB1MdHq9Ou79_0i3luGk6a6_IzTIaMxwkLN505bPhWPIEyeHCOW94ZzIndp6ZgVkPvnC9E1mA3rtLQHmKQN3crRGY_cyBt02EANIwmq9vktZ3CwHhm8XsMYpHYsVbXqdk-LpnCxul9616rxqmE_gbwtUduk7ze5EzrXphK_VTnO1s3_DSY2FGlYX0OXD5DDvhKBUvdBcBJkE54U")',
        }}
      />
    </div>
  </div>
);

const AboutVision: React.FC = () => (
  <>
    <h1 className="text-[#181112] dark:text-white tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
      The Art of Customization
    </h1>
    <h2 className="text-[#181112] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
      Our Vision
    </h2>
    <p className="text-[#181112] dark:text-gray-300 text-base font-normal leading-normal pb-3 pt-1 px-4">
      At SneakerLab, we envision a future where technology and street culture
      converge. Our mission is to empower individuals to express their unique
      style through personalized 3D sneaker designs. We believe in the power of
      creativity and innovation to redefine self-expression.
    </p>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
      {[
        "https://lh3.googleusercontent.com/aida-public/AB6AXuACas3T3ZANrY3h9AqObKZdwvlnTRhkHhd2Zm9TwNOoAc6yFmLzyXOHRZ2MhIlE2E4GtdH2CEVWT5OnmCZPL1PbDxwjGqX3emwgc-dmIIzv36Uw4Hc7X5chJ6xxOJUJx43Sk1qBE7xzlZwncr6f3orAno-923cqe9Ek9P-6Zt_1nALUWugvcQIbII3xnZthkRdjEZvFsjeD_tvWgyDW92woT2v0dC-n2KTjBzyvoz9eluMWYtJvBcBAnZAU15M1uuo2cUw-FXW8MTA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAZJxVqG8AAeYDLWFLlxSEtlMjzGuWuFR2_oVn9ZFjdQUrRMywpUF10KEg465QgDOnLT60WynPD97FDJKDeD9-z3s89PIGkR4qOv5pg4GDKJCuLrrClEbt12PAbrhL50JCfUUWJ3228iXOTw7h15NT5iZo1tcQ6nqd6rBCNmPWlv4tELp3kbgCP1G--Ti56un4E1hb4eIRZb4y9WIuGgIJWUdaDviIvM8URENcf10XvmUXpBFpelVrUU6Hz4IGJlpC5gU21BCiVHTg",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDbFYvPlhQDppEs3-W5jTmyAsdmr_u3y5elkarxhc2kKUpwcGIO00xOBIOpgNmq9Ce7FQljEH5J69qVrDz3nh9ZJP3V35pxvi22r2oP1ZEk_86J8Lddw4wonIHLO-IFDXOgxvN4RT5F6dfEAmBFk3UOe965bQNagSBLFhnSvEiyNxq3KbJXHMkTv2isLv9YKNdErjjj0sqLgyHm2I22L6UMFsof__cwMKznTyHjwMxrv3-1pBiJ0jeEiwFnWxm1pxPZZ6I4vSjNqjI",
      ].map((url, idx) => (
        <div key={idx} className="flex flex-col gap-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded"
            style={{ backgroundImage: `url("${url}")` }}
          />
        </div>
      ))}
    </div>
  </>
);

const AboutJourney: React.FC = () => (
  <>
    <h2 className="text-[#181112] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
      Our Journey
    </h2>
    <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
      <div className="flex flex-col items-center gap-1 pt-3">
        <div className="text-[#181112] dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z" />
          </svg>
        </div>
        <div className="w-[1.5px] bg-[#e6dbdd] h-2 grow" />
      </div>
      <div className="flex flex-1 flex-col py-3">
        <p className="text-[#181112] dark:text-white text-base font-medium leading-normal">
          2018: The Idea
        </p>
        <p className="text-[#896168] dark:text-gray-400 text-base font-normal leading-normal">
          The concept of merging 3D technology with sneaker customization was
          born.
        </p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="w-[1.5px] bg-[#e6dbdd] h-2" />
        <div className="text-[#181112] dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M103.77,185.94C103.38,187.49,93.63,224,40,224a8,8,0,0,1-8-8c0-53.63,36.51-63.38,38.06-63.77a8,8,0,0,1,3.88,15.53c-.9.25-22.42,6.54-25.56,39.86C81.7,204.48,88,183,88.26,182a8,8,0,0,1,15.51,4Zm93-67.4L192,123.31v58.33A15.91,15.91,0,0,1,187.32,193L153,227.3A15.91,15.91,0,0,1,141.7,232a16.11,16.11,0,0,1-5.1-.83,15.94,15.94,0,0,1-10.78-12.92l-5.37-38.49L76.24,135.55l-38.47-5.37A16,16,0,0,1,28.7,103L63,68.68A15.91,15.91,0,0,1,74.36,64h58.33l4.77-4.77c26.68-26.67,58.83-27.82,71.41-27.07a16,16,0,0,1,15,15C224.6,59.71,223.45,91.86,196.78,118.54ZM40,114.34l37.15,5.18L116.69,80H74.36ZM91.32,128,128,164.68l57.45-57.45a76.46,76.46,0,0,0,22.42-59.16,76.65,76.65,0,0,0-59.11,22.47ZM176,139.31l-39.53,39.53L141.67,216,176,181.64Z" />
          </svg>
        </div>
        <div className="w-[1.5px] bg-[#e6dbdd] h-2 grow" />
      </div>
      <div className="flex flex-1 flex-col py-3">
        <p className="text-[#181112] text-base font-medium leading-normal">
          2020: Launch
        </p>
        <p className="text-[#896168] text-base font-normal leading-normal">
          SneakerLab officially launched, offering a new way to design sneakers.
        </p>
      </div>
      <div className="flex flex-col items-center gap-1 pb-3">
        <div className="w-[1.5px] bg-[#e6dbdd] h-2" />
        <div className="text-[#181112] dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
          </svg>
        </div>
      </div>
      <div className="flex flex-1 flex-col py-3">
        <p className="text-[#181112] text-base font-medium leading-normal">
          2023: Expansion
        </p>
        <p className="text-[#896168] text-base font-normal leading-normal">
          Expanded our offerings to include more materials and design options.
        </p>
      </div>
    </div>
  </>
);

export const AboutPage: React.FC = () => {
  return (
    <div
      className="relative flex w-full flex-col bg-white dark:bg-background-dark dark:text-white overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <AboutHero />
            <AboutVision />
            <AboutJourney />
          </div>
        </div>
      </div>
    </div>
  );
};
