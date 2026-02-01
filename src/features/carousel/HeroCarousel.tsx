import { useEffect, useMemo, useRef, useState } from "react";
import type { Sneaker } from "../../data/models";
import { ModelViewer } from "./ModelViewer";
import { useCarouselStore } from "@/store/carousel-store";

type HeroCarouselProps = {
  models: Sneaker[];
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onStart: (modelId: string) => void;
};

type SlideState = {
  key: string;
  model: Sneaker;
  index: number;
};

export function HeroCarousel({
  models,
  activeIndex,
  onNext,
  onPrev,
  onStart,
}: HeroCarouselProps) {
  const direction = useCarouselStore((s) => s.direction);
  const setIsTransitioning = useCarouselStore((s) => s.setIsTransitioning);

  const [current, setCurrent] = useState<SlideState>(() => ({
    key: `slide-${models[activeIndex].id}-${activeIndex}`,
    model: models[activeIndex],
    index: activeIndex,
  }));

  const currentRef = useRef(current);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const nextSlide = useMemo<SlideState>(() => {
    const m = models[activeIndex];
    return {
      key: `slide-${m.id}-${activeIndex}`,
      model: m,
      index: activeIndex,
    };
  }, [models, activeIndex]);

  const [prev, setPrev] = useState<SlideState | null>(null);
  const [phase, setPhase] = useState<"idle" | "prep" | "anim">("idle");

  useEffect(() => {
    if (nextSlide.index === currentRef.current.index) return;

    setIsTransitioning(true);
    setPrev(currentRef.current);
    setCurrent(nextSlide);
    setPhase("prep");

    let r1 = 0;
    let r2 = 0;

    r1 = window.requestAnimationFrame(() => {
      r2 = window.requestAnimationFrame(() => setPhase("anim"));
    });

    const t = window.setTimeout(() => {
      setPhase("idle");
      setPrev(null);
      setIsTransitioning(false);
    }, 560);

    return () => {
      window.cancelAnimationFrame(r1);
      window.cancelAnimationFrame(r2);
      window.clearTimeout(t);
    };
  }, [nextSlide, setIsTransitioning]);

  const dirClass = direction === 1 ? "dirNext" : "dirPrev";

  return (
    <div className="heroSlideRoot">
      <div className="heroStage">
        {prev && (
          <div
            className={[
              "heroSlide",
              "heroSlidePrev",
              dirClass,
              phase === "anim" ? "heroSlidePrevAnim" : "",
            ].join(" ")}
          >
            <SlideContent
              model={prev.model}
              onNext={onNext}
              onPrev={onPrev}
              onStart={onStart}
            />
          </div>
        )}

        <div
          key={current.key}
          className={[
            "heroSlide",
            "heroSlideCurrent",
            dirClass,
            phase === "prep" ? "heroSlideCurrentPrep" : "",
            phase === "anim" ? "heroSlideCurrentAnim" : "",
          ].join(" ")}
        >
          <SlideContent
            model={current.model}
            onNext={onNext}
            onPrev={onPrev}
            onStart={onStart}
          />
        </div>
      </div>
    </div>
  );
}

function SlideContent({
  model,
  onNext,
  onPrev,
  onStart,
}: {
  model: Sneaker;
  onNext: () => void;
  onPrev: () => void;
  onStart: (modelId: string) => void;
}) {
  return (
    <div className="heroSlideGrid">
      <div className="glass-panel rounded-2xl p-6 shadow-glass heroSlideLeft">
        <div className="flex flex-col gap-2">
          {model.badges && model.badges.length > 0 && (
            <span
              className={`font-bold tracking-widest uppercase text-xs ${
                model.badges[0].variant === "primary"
                  ? "text-primary"
                  : "text-text-muted"
              }`}
            >
              {model.badges[0].text}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9] text-text-main uppercase break-words">
            {model.name.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>
        </div>

        <p className="text-text-muted text-base max-w-xs font-medium leading-relaxed">
          {model.description}
        </p>

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={onPrev}
            className="size-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all group bg-transparent"
          >
            <span className="material-symbols-outlined text-text-muted group-hover:text-text-main">
              arrow_back
            </span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="size-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all group bg-transparent"
          >
            <span className="material-symbols-outlined text-text-muted group-hover:text-text-main">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      <div className="heroSlideCenter">
        <div className="heroShoeWrap">
          <div className="heroShoeShadow" />
          <ModelViewer key={model.id} url={model.glb || ""} />
        </div>
      </div>

      <div className="heroSlideRight">
        <div className="glass-panel w-full max-w-md lg:max-w-xs p-6 rounded-2xl shadow-glass flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-text-main">{model.name}</h3>
              <p className="text-sm text-text-muted font-medium">
                {model.silhouette}
              </p>
            </div>
            <span className="text-lg font-bold text-text-main">
              ${model.price}.00
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {model.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white border border-gray-100 text-xs font-semibold text-text-main shadow-sm capitalize"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-sm border-b border-gray-200/50 pb-2">
              <span className="text-text-muted">Texture</span>
              <span className="font-semibold text-text-main">4K PBR</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-gray-200/50 pb-2">
              <span className="text-text-muted">Lighting</span>
              <span className="font-semibold text-text-main">Studio Day</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onStart(model.id)}
              className="w-full py-3 bg-text-main hover:bg-black text-white rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-gray-200 transition-all flex items-center justify-center gap-2 group"
            >
              Shop now
              <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
