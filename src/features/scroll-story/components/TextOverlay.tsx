import type { TextBlock } from "../helpers/types";
import { clamp01, getAnchorTranslate, getEnterVector, getPlacement, mix, smootherstep } from "../helpers/utils";

export function TextOverlay({
  progress,
  blocks,
}: {
  progress: number;
  blocks: TextBlock[];
}) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {blocks.map((b) => {
        const inT = smootherstep(b.tStart, b.tStart + 0.06, progress);
        const outT = 1 - smootherstep(b.tEnd - 0.06, b.tEnd, progress);
        const vis = clamp01(inT * outT);

        const placement = getPlacement(b.position);
        const { xFrom, yFrom } = getEnterVector(b.position);

        const x = mix(xFrom, 0, smootherstep(0, 1, vis)) + (b.offset?.x ?? 0);
        const y = mix(yFrom, 0, smootherstep(0, 1, vis)) + (b.offset?.y ?? 0);

        const { tx, ty } = getAnchorTranslate(placement.anchor);

        const width = b.width ?? "min(360px, 42vw)";

        const textAlign =
          b.position === "right" ||
          b.position === "top-right" ||
          b.position === "bottom-right"
            ? ("right" as const)
            : ("left" as const);

        return (
          <div
            key={b.id}
            style={{
              position: "absolute",
              left: placement.left,
              right: placement.right,
              top: placement.top,
              bottom: placement.bottom,
              width,
              opacity: vis,
              filter: `blur(${mix(6, 0, vis)}px)`,
              transform: `translate(${tx}, ${ty}) translate(${x}px, ${y}px)`,
              textAlign,
              zIndex: 100,
            }}
          >
            <div className="glass-panel w-full max-w-md lg:max-w-xs p-6 rounded-xl shadow-glass flex flex-col gap-6">
              <div
                style={{
                  fontSize: 42,
                  letterSpacing: 1,
                  opacity: 1,
                  marginBottom: 6,
                  textTransform: "uppercase",
                  fontFamily: "Luckiest Guy",
                  color: "white",
                }}
              >
                {b.title}
              </div>
              <div
                style={{
                  fontSize: 28,
                  lineHeight: 1.45,
                  opacity: 0.96,
                  color: "white",
                  fontFamily: "Manrope",
                }}
              >
                {b.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}