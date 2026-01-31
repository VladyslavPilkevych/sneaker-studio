export function ModelStoryStatic() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#0b0b10]">
      <div className="absolute inset-0 z-0 flex flex-col justify-center pointer-events-none select-none">
        <div className="font-impact text-[25vw] leading-[0.8] opacity-10 uppercase -ml-20 -mt-20">
          URBAN
        </div>
        <div className="font-impact text-[20vw] leading-[0.8] opacity-5 uppercase self-end -mr-10">
          ARMOR
        </div>
        <div className="absolute bottom-0 left-0 font-street text-[15vw] text-primary opacity-10 rotate-[-15deg] -translate-x-1/4">
          MANIFESTO
        </div>
      </div>

      <section className="relative z-10 w-full max-w-7xl flex flex-col items-center py-24">
        <div className="absolute top-20 left-0 right-0 z-40 flex flex-col items-center pointer-events-none">
          <h1 className="font-impact text-[12vw] md:text-[14vw] leading-none tracking-tighter text-white uppercase italic mix-blend-overlay opacity-80">
            UNAPOLOGETIC
          </h1>
          <h2 className="font-impact text-[10vw] md:text-[12vw] leading-none tracking-tight text-primary uppercase italic -mt-8 md:-mt-16 ml-20 md:ml-40 bg-black/40 px-4">
            STREET_KING
          </h2>
        </div>

        <div className="relative w-full flex items-center justify-center hero-glow py-32">
          <div className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-12">
            <div className="vertical-text font-tech text-3xl font-black text-white/20">
              RULE_BREAKER
            </div>
            <div className="vertical-text font-street text-5xl text-primary spray-shadow">
              CHAOS
            </div>
          </div>

          <div className="relative transform transition-transform duration-1000">
            <div className="absolute -top-10 -left-10 w-32 h-32 border-t-[12px] border-l-[12px] border-primary/40" />

            <img
              alt="Sneaker"
              className="relative z-20 w-full max-w-[900px] object-contain drop-shadow-[0_60px_60px_rgba(242,13,24,0.3)] -rotate-12 hover:rotate-0 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBavAeSiaf9IAAf3-iEZQ67HVotDcE8fR8hwZtzDtXvW8GRLxlSi6pzTBKtz0Cl227dWaI5ErOB7wQI0ns1__73EXqdS4pDMJ8pZmFh1X2Czf6v8Rp2E2XaYRhay-f2unq3dx2JGZLHbzvV-HBp47goVKO94TnixYlNPbaJhZXldJEjNaYrGI3MwU_0SJQcqjzigwTV_bzZYW306v3uB7AR9e10i9VImgeGp7yo4oFIiOqjM8fTe3Mxd6UVsyeLd58PE9nhcKi6BK2h"
            />

            <div className="absolute -bottom-10 -right-10 w-32 h-32 border-b-[12px] border-r-[12px] border-white/20" />

            <div className="absolute bottom-1/4 -right-12 z-30 bg-primary text-white font-impact text-6xl px-6 py-2 -rotate-6 shadow-2xl">
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

      <div className="relative z-40 w-full max-w-7xl px-6 pb-40 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-6 relative">
          <div className="absolute -top-12 -left-4 font-street text-6xl text-primary/20 pointer-events-none">
            STREET_LAW
          </div>
          <div className="bg-white/5 border-l-4 border-primary p-12 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <p className="font-display text-2xl md:text-3xl font-black leading-[1.1] text-white uppercase tracking-tighter">
              WE DON'T FOLLOW THE BLUEPRINT. WE DRAW IT WITH SPRAY PAINT AND
              SWEAT. BUILT TO WITHSTAND THE CONCRETE GRIND. REFINED BY THE COLD
              NIGHTS.
            </p>
            <div className="mt-8 font-stencil text-primary text-xl tracking-[0.3em]">
              [ SYSTEM_OVERRIDE ]
            </div>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-6 pt-12">
          <div className="flex flex-col gap-1">
            <span className="font-tech text-[10px] text-white/30 tracking-[0.5em]">
              ATTRIBUTES
            </span>
            <div className="h-[2px] bg-primary w-12" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="font-stencil text-3xl text-white hover:text-primary transition-colors cursor-default">
              TOUGH
            </div>
            <div className="font-stencil text-3xl text-white hover:text-primary transition-colors cursor-default">
              AUTHENTIC
            </div>
            <div className="font-stencil text-3xl text-white hover:text-primary transition-colors cursor-default">
              LEGACY
            </div>
            <div className="font-stencil text-3xl text-white hover:text-primary transition-colors cursor-default">
              GRITTY
            </div>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col items-end justify-end gap-6">
          <div className="text-right flex flex-col">
            <span className="font-tech text-[10px] text-white/40">
              MARKET_VALUE
            </span>
            <span className="font-impact text-7xl italic leading-none">
              $110
            </span>
          </div>

          <button className="group relative w-full h-24 bg-white text-black font-impact text-3xl uppercase italic overflow-hidden">
            <span className="relative z-10 group-hover:text-white transition-colors">
              SECURE_ICON
            </span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </main>
  );
}
