import type { OverlayPosition, Keyframe } from "./types";

export function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export function smootherstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerpV3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];
}

export function lerpScalar(a: number, b: number, t: number) {
  return mix(a, b, t);
}

export function sampleKeyframes(t: number, frames: Keyframe[]) {
  if (t <= frames[0].t) return frames[0];
  if (t >= frames[frames.length - 1].t) return frames[frames.length - 1];

  let i = 0;
  for (; i < frames.length - 1; i++) {
    if (t >= frames[i].t && t <= frames[i + 1].t) break;
  }

  const a = frames[i];
  const b = frames[i + 1];
  const uRaw = (t - a.t) / (b.t - a.t);
  const u = smootherstep(0, 1, uRaw);

  return {
    t,
    cameraPos: lerpV3(a.cameraPos, b.cameraPos, u),
    target: lerpV3(a.target, b.target, u),
    modelPos: lerpV3(a.modelPos, b.modelPos, u),
    modelRot: lerpV3(a.modelRot, b.modelRot, u),
    modelScale: lerpScalar(a.modelScale, b.modelScale, u),
  };
}

export function getPlacement(position: OverlayPosition) {
  const base = {
    left: "auto",
    right: "auto",
    top: "auto",
    bottom: "auto",
  } as const;

  if (position === "left")
    return { ...base, left: "6%", top: "50%", anchor: "left-mid" as const };
  if (position === "right")
    return { ...base, right: "6%", top: "50%", anchor: "right-mid" as const };
  if (position === "top")
    return { ...base, top: "8%", left: "50%", anchor: "top-center" as const };
  if (position === "bottom")
    return {
      ...base,
      bottom: "8%",
      left: "50%",
      anchor: "bottom-center" as const,
    };
  if (position === "center")
    return { ...base, top: "50%", left: "50%", anchor: "center" as const };

  if (position === "top-left")
    return { ...base, top: "8%", left: "6%", anchor: "top-left" as const };
  if (position === "top-right")
    return { ...base, top: "8%", right: "6%", anchor: "top-right" as const };
  if (position === "bottom-left")
    return {
      ...base,
      bottom: "8%",
      left: "6%",
      anchor: "bottom-left" as const,
    };
  return {
    ...base,
    bottom: "8%",
    right: "6%",
    anchor: "bottom-right" as const,
  };
}

export function getEnterVector(position: OverlayPosition) {
  if (position === "left") return { xFrom: -28, yFrom: 0 };
  if (position === "right") return { xFrom: 28, yFrom: 0 };
  if (position === "top") return { xFrom: 0, yFrom: -18 };
  if (position === "bottom") return { xFrom: 0, yFrom: 18 };
  if (position === "center") return { xFrom: 0, yFrom: 10 };

  if (position === "top-left") return { xFrom: -22, yFrom: -14 };
  if (position === "top-right") return { xFrom: 22, yFrom: -14 };
  if (position === "bottom-left") return { xFrom: -22, yFrom: 14 };
  return { xFrom: 22, yFrom: 14 };
}

export function getAnchorTranslate(anchor: string) {
  if (anchor === "left-mid") return { tx: "0%", ty: "-50%" };
  if (anchor === "right-mid") return { tx: "0%", ty: "-50%" };
  if (anchor === "top-center") return { tx: "-50%", ty: "0%" };
  if (anchor === "bottom-center") return { tx: "-50%", ty: "0%" };
  if (anchor === "center") return { tx: "-50%", ty: "-50%" };

  if (anchor === "top-left") return { tx: "0%", ty: "0%" };
  if (anchor === "top-right") return { tx: "0%", ty: "0%" };
  if (anchor === "bottom-left") return { tx: "0%", ty: "0%" };
  return { tx: "0%", ty: "0%" };
}