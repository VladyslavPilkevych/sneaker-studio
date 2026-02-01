import { useEffect, useState } from "react";
import { clamp01 } from "./utils";

export function useSectionScrollProgress(
  sectionRef: React.RefObject<HTMLElement | null>,
) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = el.offsetHeight - vh;
      const scrolled = -rect.top;
      const next = total <= 0 ? 0 : clamp01(scrolled / total);
      setP(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionRef]);

  return p;
}
