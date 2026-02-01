import { useEffect, useState } from "react";
import { clamp01, mix, smootherstep } from "../helpers/utils";

export function HeroOverlay({ progress }: { progress: number }) {
  const [heroScale, setHeroScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const size = window.innerHeight;
      const scale = Math.min(1, Math.max(0.5, size / 1220));
      setHeroScale(scale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const start = clamp01(1 - smootherstep(0.0, 0.12, progress));
  const end = clamp01(smootherstep(0.88, 1.0, progress));
  const fade = Math.max(start, end);

  const startT = smootherstep(0.0, 0.12, progress);
  const endT = 1 - smootherstep(0.88, 1.0, progress);
  const t = Math.min(startT, endT);

  const y = mix(0, -16, t);
  const blur = mix(0, 10, t);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        opacity: fade,
        pointerEvents: fade > 0.02 ? "auto" : "none",
        transform: `translateY(${y}px) scale(${heroScale})`,
        transformOrigin: "center center",
        filter: `blur(${blur}px)`,
        display: "grid",
        placeItems: "center",
        alignContent: "start",
        marginTop: "-180px",
      }}
      className="xl:pt-24"
    >
      <div className="relative flex flex-col items-center justify-center pt-12 md:pt-20 bg-[#0b0b10]">
        <div className="absolute inset-0 z-0 flex flex-col justify-center pointer-events-none select-none">
          <div className="font-impact text-[25vw] leading-[0.8] opacity-10 uppercase -ml-20 -mt-20">
            URBAN
          </div>
          <div className="font-impact text-[20vw] leading-[0.8] opacity-5 uppercase self-end -mr-10">
            ARMOR
          </div>
          <div className="absolute bottom-0 right-0 font-street text-[15vw] text-destructive opacity-10 rotate-[-15deg] translate-x-1/4">
            MANIFESTO
          </div>
        </div>

        <div className="absolute top-20 left-0 right-0 z-40 flex flex-col items-center pointer-events-none">
          <h2 className="font-impact text-[100px] md:text-[120px] leading-none tracking-tighter text-white uppercase italic mix-blend-overlay opacity-80">
            UNAPOLOGETIC
          </h2>
          <h2 className="font-impact text-[80px] md:text-[100px] leading-none tracking-tight text-destructive uppercase italic -mt-8 md:-mt-16 ml-20 md:ml-40 bg-black/40 px-4">
            STREET_KING
          </h2>
        </div>

        <section className="relative z-10 w-full max-w-none flex flex-col items-center py-24">
          <div className="relative w-full flex items-center justify-center hero-glow py-32">
            <div className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-12">
              <div className="vertical-text font-tech text-3xl font-black text-white/20">
                RULE_BREAKER
              </div>
              <div className="vertical-text font-street text-5xl text-destructive spray-shadow">
                CHAOS
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 border-t-[12px] border-l-[12px] border-primdestructiveary/40" />

              <div className="relative w-[400px] max-w-none">
                <img
                  alt="Sneaker"
                  className="relative z-20 w-full aspect-square bg-white drop-shadow-[0_100px_100px_rgba(242,13,24,0.3)]"
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='white'/></svg>"
                />
              </div>

              <div className="absolute -bottom-10 -right-10 w-32 h-32 border-b-[12px] border-r-[12px] border-white/20" />

              <div className="absolute bottom-1/4 -right-44 z-30 bg-destructive text-white font-impact text-6xl px-6 py-2 -rotate-6 shadow-2xl">
                V.001
              </div>
            </div>

            <div className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end gap-8">
              <div className="vertical-text font-stencil text-2xl font-black text-white/50 border-l border-white/20 pl-4">
                HEAVYWEIGHT_LEATHER
              </div>
              <div className="font-impact text-8xl text-white/10 uppercase -rotate-90">
                RAW
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-40 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-12 -mt-28">
          <div className="md:col-span-6 relative">
            <div className="absolute -top-16 -left-4 font-street text-6xl text-destructive/20 pointer-events-none">
              STREET_LAW
            </div>
            <div className="bg-white/5 border-l-4 border-destructive p-12 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full blur-3xl" />
              <p className="font-display text-2xl md:text-3xl font-black leading-[1.1] text-white uppercase tracking-tighter">
                WE DON'T FOLLOW THE BLUEPRINT. WE DRAW IT WITH SPRAY PAINT AND
                SWEAT. BUILT TO WITHSTAND THE CONCRETE GRIND. REFINED BY THE
                COLD NIGHTS.
              </p>
              <div className="mt-8 font-stencil text-destructive text-xl tracking-[0.3em]">
                [ SYSTEM_OVERRIDE ]
              </div>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col gap-6 pt-12">
            <div className="flex flex-col gap-1">
              <span className="font-tech text-[10px] text-white/30 tracking-[0.5em]">
                ATTRIBUTES
              </span>
              <div className="h-[2px] bg-destructive w-12" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-stencil text-3xl text-white hover:text-destructive transition-colors cursor-default">
                TOUGH
              </div>
              <div className="font-stencil text-3xl text-white hover:text-destructive transition-colors cursor-default">
                AUTHENTIC
              </div>
              <div className="font-stencil text-3xl text-white hover:text-destructive transition-colors cursor-default">
                LEGACY
              </div>
              <div className="font-stencil text-3xl text-white hover:text-destructive transition-colors cursor-default">
                GRITTY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
