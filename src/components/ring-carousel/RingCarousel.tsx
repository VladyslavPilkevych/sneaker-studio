import { useEffect, useMemo, useState } from "react";

type RingCarouselProps = {
  items: { id: string; label: string }[];
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  panelSize?: number;
};

export function RingCarousel({
  items,
  activeIndex,
  onNext,
  onPrev,
  panelSize = 186,
}: RingCarouselProps) {
  const count = Math.max(items.length, 3);
  const rY = 360 / count;

  const tz = useMemo(() => {
    const rad = (Math.PI * 2) / count / 2;
    return Math.round(panelSize / 2 / Math.tan(rad));
  }, [count, panelSize]);

  const [deg, setDeg] = useState(0);

  useEffect(() => {
    setDeg(-activeIndex * rY);
  }, [activeIndex, rY]);

  const handleNext = () => {
    setDeg((v) => v - rY);
    onNext();
  };

  const handlePrev = () => {
    setDeg((v) => v + rY);
    onPrev();
  };

  return (
    <div className="ringRoot">
      <div className="ringStage">
        <div
          className="ringCarousel"
          style={{ transform: `rotateY(${deg}deg)` }}
        >
          {items.map((it, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={it.id}
                className={`ringPane ${isActive ? "ringPaneActive" : ""}`}
                style={{
                  transform: `rotateY(${i * rY}deg) translateZ(${tz}px)`,
                }}
              >
                {it.label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="ringButtons">
        <button type="button" className="ringBtn" onClick={handlePrev}>
          ←
        </button>
        <button
          type="button"
          className="ringBtn ringBtnPrimary"
          onClick={handleNext}
        >
          →
        </button>
      </div>
    </div>
  );
}
