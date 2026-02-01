import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Edit3, Star, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Sneaker } from "@/data/models";
import { useCartStore } from "@/store/cart-store";
import { Seo } from "@/components/ui/Seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { toast } from "react-toastify";

const SIZES = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12", "US 13"];

export function ProductDetailsPage() {
  const { id } = useParams();
  const [sneaker, setSneaker] = useState<Sneaker | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("US 10");
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchSneaker = async () => {
      try {
        const response = await fetch("/data/sneakers.json");
        const data: Sneaker[] = await response.json();
        const found = data.find((s) => s.id === id);
        setSneaker(found || null);
      } catch (error) {
        console.error("Error fetching sneaker data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSneaker();
  }, [id]);

  const handleAddToCart = () => {
    if (sneaker) {
      addItem({
        ...sneaker,
      });
      toast.success("Added to cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!sneaker) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/collections">
          <Button>Back to Collections</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <Seo
        title={`${sneaker.name} - Sneaker Studio`}
        description={
          sneaker.description ||
          `Shop the latest ${sneaker.name} at Sneaker Studio.`
        }
      />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="relative aspect-square rounded-3xl bg-[#f8f8f8] dark:bg-[#1a1a33] overflow-hidden group">
            <img
              src={sneaker.image}
              alt={sneaker.imageAlt}
              className="w-full h-full object-contain p-12 transition-transform duration-700 group-hover:scale-110"
            />
            {sneaker.badges && sneaker.badges.length > 0 && (
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {sneaker.badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest ${
                      badge.variant === "primary"
                        ? "bg-primary text-white"
                        : badge.variant === "dark"
                          ? "bg-black text-white"
                          : "bg-white text-black border border-gray-100 shadow-sm"
                    }`}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                (120 Reviews)
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-none uppercase italic">
              {sneaker.name}
            </h1>

            <p className="text-2xl font-bold text-primary mb-6">
              ${sneaker.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed max-w-md">
              {sneaker.description ||
                "The ultimate combination of style and performance. Designed for those who demand excellence in every step."}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-widest">
                  Silhouette
                </p>
                <p className="font-bold text-sm">{sneaker.silhouette}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-widest">
                  Materials
                </p>
                <p className="font-bold text-sm">
                  {sneaker.materials.join(", ")}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest">
                  Select Size
                </h3>
                <button className="text-[10px] font-bold underline uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs font-bold rounded-xl border-2 transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary text-white"
                        : "border-border hover:border-muted-foreground/30 bg-background"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-12">
              <Button
                onClick={handleAddToCart}
                className="w-full py-7 rounded-2xl text-base font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              {sneaker.glb && (
                <Link to={`/model/${sneaker.id}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full py-7 rounded-2xl text-base font-black uppercase tracking-widest border-2 hover:bg-black hover:text-white transition-all hover:border-black active:scale-[0.98]"
                  >
                    <Edit3 className="mr-2 h-5 w-5" />
                    Customize in 3D
                  </Button>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Truck className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    Fast Delivery
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    Free on orders over $150
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Shield className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    Secure Payment
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    100% data protection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
