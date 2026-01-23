import { useEffect, useMemo, useRef, useState } from "react";
import type { SneakerModel } from "../data/models";
import { ModelViewer } from "./ModelViewer";

type HeroCarouselProps = {
  models: SneakerModel[];
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onStart: (modelId: string) => void;
};

export function HeroCarousel({
  models,
  activeIndex,
  onNext,
  onPrev,
  onStart,
}: HeroCarouselProps) {
  const items = useMemo(() => models, [models]);
  const [phase, setPhase] = useState<"idle" | "anim">("idle");
  const prevIndexRef = useRef(activeIndex);

  useEffect(() => {
    if (prevIndexRef.current === activeIndex) return;
    prevIndexRef.current = activeIndex;

    const animationEnded = () => {
      setPhase("idle");
    };

    const t = window.setTimeout(animationEnded, 520);

    return () => window.clearTimeout(t);
  }, [activeIndex]);

  const model = items[activeIndex];

  console.log(model.imgUrl);

  return (
    <div className="heroSlideRoot">
      <div className="heroSlideGrid">
        <div
          className={`glass-panel rounded-2xl p-6 shadow-glass heroSlideLeft ${phase === "anim" ? "heroSlideEnter" : ""}`}
        >
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">
              New Arrival
            </span>

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
                ←
              </span>
            </button>

            <button
              type="button"
              onClick={onNext}
              className="size-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all"
            >
              <span className="material-symbols-outlined">→</span>
            </button>
          </div>
        </div>

        <div className="heroSlideCenter">
          {/* <div className="absolute inset-0 pointer-events-none hero-spotlight -z-20"></div> */}

          {/* <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-gray-100 to-white rounded-full -z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.02)]"></div> */}

          <div
            className={`heroShoeWrap ${phase === "anim" ? "heroShoeEnter" : ""}`}
          >
            <div className="heroShoeShadow" />
            {/* <img
              className="heroShoeImg"
              src={model.imgUrl}
              alt={model.name}
              draggable={false}
            /> */}
            <ModelViewer url={model.glbUrl} />
          </div>
        </div>

        <div
          className={`heroSlideRight ${phase === "anim" ? "heroSlideEnter" : ""}`}
        >
          <div className="glass-panel w-full max-w-md lg:max-w-xs p-6 rounded-2xl shadow-glass flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-text-main">
                  {model.name}
                </h3>
                <p className="text-sm text-text-muted font-medium">
                  Original Collection
                </p>
              </div>
              <span className="text-lg font-bold text-text-main">$170.00</span>
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
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
