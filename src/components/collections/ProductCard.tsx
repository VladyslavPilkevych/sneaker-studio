import { Link } from "react-router-dom";

interface Badge {
  text: string;
  variant: "primary" | "dark" | "light";
}

interface ProductCardProps {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  price: number;
  badges?: Badge[];
  colors?: string[];
}

export function ProductCard({
  id,
  image,
  imageAlt,
  title,
  price,
  badges,
  colors,
}: ProductCardProps) {
  return (
    <div className="card-hover group flex flex-col cursor-pointer">
      <div className="relative aspect-square overflow-hidden bg-[#f0f0f0] dark:bg-[#1a1a33] rounded-xl flex items-center justify-center p-8">
        <img
          alt={title}
          className="shoe-img w-full h-auto object-contain transition-transform duration-500 ease-out"
          data-alt={imageAlt}
          src={image}
        />
        {badges && badges.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`text-[10px] font-black uppercase px-2 py-1 rounded-sm tracking-widest ${
                  badge.variant === "primary"
                    ? "bg-primary text-white"
                    : badge.variant === "dark"
                      ? "bg-[#0d0d1b] text-white"
                      : "bg-white/90 backdrop-blur-sm text-[#0d0d1b] border border-gray-100"
                }`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}
        <div className="customize-btn absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 transition-all duration-300 transform translate-y-4">
          <Link
            to={`/model/${id}`}
            className="bg-white text-black text-xs font-bold px-6 py-3 rounded-full shadow-2xl hover:bg-black hover:text-white transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#4c4c9a] font-medium">
            Starting from{" "}
            <span className="text-[#0d0d1b] dark:text-white font-bold ml-1">
              ${price.toFixed(2)}
            </span>
          </p>
          {colors && colors.length > 0 && (
            <div className="flex -space-x-1">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`size-4 rounded-full ring-2 ring-white dark:ring-[#101022] ${color}`}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
