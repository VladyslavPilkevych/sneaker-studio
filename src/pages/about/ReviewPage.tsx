import React from "react";

const StarIcon = ({
  fill = true,
  size = "18px",
}: {
  fill?: boolean;
  size?: string;
}) => (
  <div
    className="text-[#111318] dark:text-white"
    style={{ width: size, height: size }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      {fill ? (
        <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
      ) : (
        <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z" />
      )}
    </svg>
  </div>
);

const RatingSummary = () => (
  <div className="flex flex-wrap gap-x-8 gap-y-6 p-4">
    <div className="flex flex-col gap-2">
      <p className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
        4.9
      </p>
      <div className="flex gap-0.5">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon fill={false} />
      </div>
      <p className="text-[#111318] dark:text-gray-300 text-base font-normal leading-normal">
        1,234 reviews
      </p>
    </div>
    <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3">
      {[
        { star: 5, pct: 80 },
        { star: 4, pct: 15 },
        { star: 3, pct: 3 },
        { star: 2, pct: 1 },
        { star: 1, pct: 1 },
      ].map((item) => (
        <React.Fragment key={item.star}>
          <p className="text-[#111318] dark:text-white text-sm font-normal leading-normal">
            {item.star}
          </p>
          <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#dbdfe6]">
            <div
              className="rounded-full bg-[#111318] dark:bg-white"
              style={{ width: `${item.pct}%` }}
            ></div>
          </div>
          <p className="text-[#616f89] text-sm font-normal leading-normal text-right">
            {item.pct}%
          </p>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const RatingBar = ({ label, width }: { label: string; width: string }) => (
  <div className="flex flex-col gap-3 p-4">
    <div className="flex gap-6 justify-between">
      <p className="text-[#111318] dark:text-white text-base font-medium leading-normal">
        {label}
      </p>
    </div>
    <div className="rounded bg-[#dbdfe6]">
      <div
        className="h-2 rounded bg-[#111318] dark:bg-white"
        style={{ width }}
      ></div>
    </div>
  </div>
);

const FilterChip = ({ label }: { label: string }) => (
  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f2f4] pl-4 pr-4">
    <p className="text-[#111318] dark:text-black text-sm font-medium leading-normal">
      {label}
    </p>
  </div>
);

const PhotoReview = ({ image, name }: { image: string; name: string }) => (
  <div className="flex flex-col gap-3 pb-3">
    <div
      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
      style={{ backgroundImage: `url("${image}")` }}
    ></div>
    <div>
      <p className="text-[#111318] dark:text-white text-base font-medium leading-normal">
        {name}
      </p>
      <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-normal">
        Verified Purchase
      </p>
    </div>
  </div>
);

const ReviewCard = ({
  avatar,
  name,
  time,
  rating,
  text,
  likes,
  dislikes,
}: {
  avatar: string;
  name: string;
  time: string;
  rating: number;
  text: string;
  likes: number;
  dislikes: number;
}) => (
  <div className="flex flex-col gap-3 bg-white">
    <div className="flex items-center gap-3">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
        style={{ backgroundImage: `url("${avatar}")` }}
      ></div>
      <div className="flex-1">
        <p className="text-[#111318] text-base font-medium leading-normal">
          {name}
        </p>
        <p className="text-[#616f89] text-sm font-normal leading-normal">
          {time}
        </p>
      </div>
    </div>
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} fill={i < rating} size="20px" />
      ))}
    </div>
    <p className="text-[#111318] text-base font-normal leading-normal">
      {text}
    </p>
    <div className="flex gap-9 text-[#616f89]">
      <button className="flex items-center gap-2">
        <div className="text-inherit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
          </svg>
        </div>
        <p className="text-inherit">{likes}</p>
      </button>
      <button className="flex items-center gap-2">
        <div className="text-inherit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
          </svg>
        </div>
        <p className="text-inherit">{dislikes}</p>
      </button>
    </div>
  </div>
);

export const ReviewPage = () => {
  return (
    <div
      className="relative flex w-full flex-col bg-white dark:bg-background-dark dark:text-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5 max-lg:px-10 max-md:px-4">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111318] dark:text-white tracking-light text-[32px] font-bold leading-tight">
                  Customer Stories &amp; Reviews
                </p>
                <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-normal">
                  See what our customers are saying about their custom sneaker
                  experience.
                </p>
              </div>
            </div>

            <RatingSummary />

            <RatingBar label="Quality" width="95%" />
            <RatingBar label="Customization Detail" width="98%" />
            <RatingBar label="Shipping" width="92%" />

            <div className="flex px-4 py-3 justify-end">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#135bec] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Write a Review</span>
              </button>
            </div>

            <h2 className="text-[#111318] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Customer Reviews
            </h2>

            <div className="flex gap-3 p-3 flex-wrap pr-4">
              <FilterChip label="With Photos" />
              <FilterChip label="Top Rated" />
              <FilterChip label="Recent" />
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <PhotoReview
                name="Sarah M."
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuAg0G3fldwJVY6axQZ1PU0B2Lp_DebE-I0HE6vHQvbl93Jp35vynQ96RxCXXvEsAG9TrdtkUXW12mUoHDK-yGyVEbyaRdQxqlTNSBniXsS3nAHaA3Z0BUfEwY2dYiL9Oiqx0JuXPujJ3A_s2EOHsG4w6pBPkkqONIdUxP3mJvNz1DfSX3LkBEhH6_dAAEwSdgGPULqpsT1kcUb27j_l0ARSyFckuWWvzAyEuJ-2xta4w-KQHvgLGiZCn09epmOqZZ8QTpI553fnBNE"
              />
              <PhotoReview
                name="David L."
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuA3m9WTfAFBG_Yh-Z-Mne_TfPP7lrl89qcup-rQX7YE0VnpU_iOKngaGs4O1kcFktLHlXvqwUfOukvPU_rS0K_GiabdKgQ2T7-x2MBXzlZrnOp6HZ-huADMlFBdYj3yY9UZsPdxW9zg4GZvKOjGaoSKVEIzIinaCcrN20DHY71upbFlxcvqAuqRbp_aCQilA7NJoG2ANwSpU28ZaitWbLv7cccirzs_4bD3Jt4p9TYcjrcMGTaJFIfXBUYTjVmBFg_GZvJ3LClRodc"
              />
              <PhotoReview
                name="Emily R."
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuANnGEVz6ikNlou8RzSv995P-NXhkoLdF2UB-ran3e6MQoZJouVp2AzWyTFXIHGkQpA8-3wezvceQZap73kym5MSkz4QChOPHa_u1xDZradOrGRk1xIAS0xcMWgvKdpmJ5frNYZNTV26hSac8i0dtIfSDSTpR9TIn2n9sOvcgpCdfveFOOYXzikxO74CqBa8pCuOGMOrDspSt3hS8MIks2eCIbKDI14CSvvVwPGI60ZhK1RXrvhImXEbJSYVfoAR22VCow2B7ZPsGw"
              />
              <PhotoReview
                name="Michael K."
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCv-b8MFbuiwIYyhfl9X5gpmzMabVsleX6dyTJ4mjE0e-bwZ5oByL3L-SOe63qAT0F1rDJeHRudq_c9xA6Se0mqQzudgsf7nr6JOGOKZnTbfkyPyo5UfDxPSXtN84UM8VnMSAiwIsNDCpxMU1-IKR-btCPAZO08jliovs_2HL6fqksiLTKwI7WVgh4SkGw84_V2v6U3ZmjZQhkMllwpA2gGmQsWEb7pbUu5fhR0bMZShmmzuxVmf8ZS5FuEMN8QcNcTveRggvasU7Y"
              />
              <PhotoReview
                name="Jessica P."
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBdXPOYG4JumffW6K9HaUh8uXCLCM-iX8E6h0ciXxkcaIUQYKTraYUjLfBazCW4Kap9Kj818O6heJLplwjCgcVTkgAy771APyWmR3LTwweEm8DGA_AQSNF0t_z3vIMYvO5jMaar4IKNCE6vDJb141u-__kNcc28biNqoqVGRbCpR8z8mmZtbJY1uZEi-sX-0eyh6uDiyENa6fvj7wD115mpWSw2b1YFSatUVTVvgBMEHhJrDs6eH4JddA7wprQhFDGPc9uID7cUrdo"
              />
              <PhotoReview
                name="Daniel S."
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBep_qYU51WwkIy8yqAYAirry98awZO57a2cwNntcuE7b8qFtt-lMjuHx9amOUfLiq_q8IwirXbbZVQKLV7oItPweVes47XDVzRNF_S7T0HRNYD5w0GiuiWOvMeEB_GwKiBpOok4STYnSrUip74zf-EMLs6YdMRuEqr6ybJrRExxHY7rYPoP-CMyy4uiJzuKgbYTM49wkY8tonEbJJS9oFlcWUez-hDVAt0IMCVykjIRPqJyAsnbF0IhuUwfnsZ_uHCM1JlQTIzJ58"
              />
            </div>

            <div className="flex flex-col gap-8 overflow-x-hidden bg-white dark:bg-background-dark p-4">
              <ReviewCard
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCze_FWSG87xvb6xbj4EgYjNw3DFT7QFlC3u_8MvOpxoB3qO4NoHSy9ofiZdny5bvLE8NSD8KaFIL-NhrOEZfF7chv056WstgWwJckREiYzj0VeNySoyleTpba_8W5GNz-9ExvnkVurd-v1MnW7Fp-Dn4iF-zVtK4c9_ROYo50bf-AaD6ibLrLVGhUHzOZd8Y4u1WR0nF0QX-i8vX2EtTtpWl251e48vZUgd1s87kiqIQHPlKi91MYwLaIy6GulD_FiRBwupjgmnps"
                name="Sarah M."
                time="2 weeks ago"
                rating={5}
                text="Absolutely love my custom sneakers! The quality is top-notch, and the customization detail is incredible. They look even better in person than they did in the app. Highly recommend!"
                likes={12}
                dislikes={2}
              />
              <ReviewCard
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuA2NKZ-GANJ0KtZW4i4gSyII_jDMLuQDM1XOjeg6YaTtaUnQ0OnCQr-vzg-W3Bx2DSZ1T4LgEiyaLukwkEMEBAAw1Jg5XHWZYhTR0Tdin7theuqs5yBo2GIZcpGzMk01OvuwW9_OoykUjqX_r045hclC0LoaQTx49X6ZNQqUenukw5YVMklpnyb9AJKuvFM90BEmdKgfFBWQZ64Q9k5hBtjs9ZgbuITwksFOPRzUlTnDsM-6siIFAPW7I3vhCsWPBQ3dYxyQuqwAr4"
                name="David L."
                time="1 month ago"
                rating={5}
                text="The customization process was so easy and fun. I was able to bring my vision to life, and the final product exceeded my expectations. The shipping was fast, and the sneakers are perfect."
                likes={8}
                dislikes={1}
              />
              <ReviewCard
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBvvfREPXJz9v3LKVv9SMDEGUxL9ait8bUxYLkWsjMJs-Wtk17vWh0PYwD2Ahu-wTDCXtoub0Lf8BNrQ_VOSZCbheT2lF2IAnIGagcGfNH6jplJlm-xpQ9epxQ6q5zXHD5bqJGAlDZeWjWis3cJvWauCAFWRnwOuIKNxGjoYjQnKSlJHdFwIOtGA3d4dokLjnKddxuIRth75GVhCDHw1gXjdePE-bDKhN2pK4xbjYI4Zh5jSCs4mt49aG7BRcK5Yb5SAcbtoJp8bYc"
                name="Emily R."
                time="3 weeks ago"
                rating={4}
                text="I'm very happy with my purchase. The sneakers are well-made and the design is exactly what I wanted. There was a slight delay in shipping, but the customer service team was very helpful."
                likes={5}
                dislikes={3}
              />
              <ReviewCard
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBegv17boJRlTKvg5PulKphAt53jk3xOay4KoWJ9V9BD5aaf-SVsJRpD-QIs2KgYrcyQp6eI1phPPHewNe5DqXx5Nihbgq8NPodmqpAIRYov6PyjmR9xmkD-2yzh7w7OJjmCSS66zktXLdPjjIPTeSmOfboJf-R_HXlX1IbUbAu2oRiuTLtNYK6wwLmCWIZxvJ3qRhVUX6gNYEXKZ2RkRw-JkH7jzjVBcvHp-buAxokEWsCNUFIxU4OLVQrfPPLGvgscSsW2ns6odc"
                name="Michael K."
                time="2 months ago"
                rating={5}
                text="These are the best custom sneakers I've ever owned. The attention to detail is amazing, and the materials are high-quality. I've received so many compliments on them."
                likes={15}
                dislikes={0}
              />
              <ReviewCard
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDcBms_zwle4QiNBl_9ur1yGp8PbQHSeznRnJL_SZokz6WEsV5waTzdJW3u0M-wCG0GELKlsTUVrKUQLWXqP4oUw4q2OPejK111oK59mZ-KThA5T5OtUqp96THYuhx3k72FGZCFMPLXHEO4IZuEizu7EUzx0yABcfJef4ozkXz0pzqHhvH57B1qtQXNHeAmE24yds0NLOJVnw8aDHb94cDFzdsRjZlzuoR_JChzcN84yekK322N18mDMKx4LOMUIWERknBQBqZ8P2s"
                name="Jessica P."
                time="1 month ago"
                rating={5}
                text="I'm obsessed with my new sneakers! The colors are vibrant, and the design is flawless. They're comfortable to wear, and I can't wait to show them off."
                likes={10}
                dislikes={1}
              />
              <ReviewCard
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCgWBz4WlVkygPP2h4fjOFHE_pFxKqoxhcS1vPnoTacUDp992fiNTLxrgJyltYM5dngXFUQk3qOph2Mk87C7gLJw9WtSciocLOjijkzEVLLPipJwFAgyfCobYL2cePDYlkglj2Oxmnvf1Km9f9u14A2_kmRMhxT9SFFEMc5cZ9CbpT4VvRKO3wg4yvSeOPBfVkrFvEb65kJpFiCQbJ-Gzqpx1CxVQzpL01H_YDp5wKsLQ0DCNdqt-mgJ6wcsLY7XjAJtTrNhpUDAAA"
                name="Daniel S."
                time="4 weeks ago"
                rating={4}
                text="Great sneakers, but the customization options could be more extensive. I had a specific design in mind that I couldn't fully achieve. Overall, the quality is excellent."
                likes={7}
                dislikes={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewPage;
