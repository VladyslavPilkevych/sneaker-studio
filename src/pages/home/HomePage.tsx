import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCarouselStore } from "../../store/carousel-store";
import { SNEAKER_MODELS } from "../../data/models";
import { Seo } from "../../components/ui/Seo";
import { HeroCarousel } from "@/features/carousel/HeroCarousel";
import { FeatureSection } from "@/components/feature-section/feature-section";
import { ScrollModelStory } from "@/features/scroll-story/ScrollModelStory";

export function HomePage() {
  const currentIndex = useCarouselStore((state) => state.currentIndex);
  const nextModel = useCarouselStore((state) => state.nextModel);
  const prevModel = useCarouselStore((state) => state.prevModel);

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevModel();
      if (e.key === "ArrowRight") nextModel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextModel, prevModel]);

  return (
    <>
      <Seo
        title="SneakerLab - 3D Portfolio"
        description="Experience high-fidelity textures. Customize the legacy with our 3D studio tools."
      />

      <div className="relative z-10 flex flex-col font-display text-text-main radial-gradient-bg">
        <main className="flex-grow flex flex-col items-center justify-center w-full px-6 md:px-12 lg:px-24 py-8 md:py-12">
          <HeroCarousel
            models={SNEAKER_MODELS}
            activeIndex={currentIndex}
            onNext={nextModel}
            onPrev={prevModel}
            onStart={(id) => navigate(`/product/${id}`)}
          />
        </main>
      </div>

      <FeatureSection />

      <ScrollModelStory url="/assets/models/nike_air_force_1.glb" />
    </>
  );
}
