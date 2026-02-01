import { Link } from "react-router-dom";

export function ModelStoryFooter() {
  return (
    <section
      className="relative z-10 w-full pt-20"
      style={{
        background: "linear-gradient(180deg, #0b0b10 0%, #0a0a0e 100%)",
      }}
    >
      <div className="flex overflow-hidden whitespace-nowrap border-y border-white/10 py-4 opacity-20">
        <div className="flex gap-20 font-impact text-4xl animate-none uppercase italic text-white">
          <span>Legendary Style</span>
          <span>Urban Legend</span>
          <span>Concrete King</span>
          <span>Legendary Style</span>
          <span>Urban Legend</span>
          <span>Concrete King</span>
          <span>Legendary Style</span>
        </div>
      </div>
      <div className="bg-white text-black py-32 mt-[-1px] relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background-dark to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-impact text-7xl md:text-9xl leading-[0.85] mb-10 tracking-tighter">
              JOIN THE <br />
              <span className="text-primary underline decoration-8 underline-offset-8">
                COLLECTIVE
              </span>
            </h2>
            <p className="font-display font-medium text-2xl max-w-md mb-12 leading-tight">
              Don't just watch the culture, define it. Get early access and
              exclusive colorways.
            </p>
            <div className="flex flex-wrap gap-4">
              {/* <button className="px-10 py-5 bg-black text-white font-impact text-2xl uppercase italic hover:bg-primary transition-all transform hover:-translate-y-1">
                SIGN_UP.EXE
              </button> */}
              <Link to="/collections">
                <button className="px-10 py-5 border-4 border-black font-impact text-2xl uppercase italic hover:bg-black hover:text-white transition-all transform hover:-translate-y-1">
                  EXPLORE_ARCHIVE
                </button>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute -top-20 -right-10 font-street text-8xl text-primary opacity-10 -rotate-12 pointer-events-none">
              #STREET_ICON
            </div>
            <div className="relative p-12 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] border-4 border-black rotate-2 transform hover:rotate-0 transition-transform">
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] font-black border-2 border-black px-2">
                  CERTIFIED_PRODUCT
                </span>
                <span className="font-mono text-[10px]">VER_4.02</span>
              </div>
              <div className="w-64 h-64 bg-black flex items-center justify-center p-4">
                <span className="material-symbols-outlined text-white text-[10rem]">
                  qr_code_2
                </span>
              </div>
              <div className="mt-6 flex flex-col font-mono text-[8px] opacity-60">
                <span>SCAN_FOR_PROVENANCE</span>
                <span>ENCRYPTED_ID_883-X9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
