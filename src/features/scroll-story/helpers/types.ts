export type Keyframe = {
  t: number;
  cameraPos: [number, number, number];
  target: [number, number, number];
  modelPos: [number, number, number];
  modelRot: [number, number, number];
  modelScale: number;
};

export type OverlayPosition =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type TextBlock = {
  id: string;
  position: OverlayPosition;
  tStart: number;
  tEnd: number;
  title: string;
  text: string;
  width?: string;
  offset?: { x?: number; y?: number };
};
