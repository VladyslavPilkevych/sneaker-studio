import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Keyframe = {
  t: number;
  cameraPos: [number, number, number];
  target: [number, number, number];
  modelPos: [number, number, number];
  modelRot: [number, number, number];
  modelScale: number;
};

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function smootherstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpV3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];
}

function lerpScalar(a: number, b: number, t: number) {
  return mix(a, b, t);
}

function sampleKeyframes(t: number, frames: Keyframe[]) {
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

function useSectionScrollProgress(
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

type OverlayPosition =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type TextBlock = {
  id: string;
  position: OverlayPosition;
  tStart: number;
  tEnd: number;
  title: string;
  text: string;
  width?: string;
  offset?: { x?: number; y?: number };
};

function getPlacement(position: OverlayPosition) {
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

function getEnterVector(position: OverlayPosition) {
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

function getAnchorTranslate(anchor: string) {
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

function TextOverlay({
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
            }}
          >
            <div className="glass-panel w-full max-w-md lg:max-w-xs p-6 rounded-2xl shadow-glass flex flex-col gap-6">
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: 0.3,
                  opacity: 0.85,
                  marginBottom: 6,
                  textTransform: "uppercase",
                }}
              >
                {b.title}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.45, opacity: 0.96 }}>
                {b.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProgressBridge({
  progressRef,
  setProgress,
}: {
  progressRef: React.MutableRefObject<number>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}) {
  const last = useRef(-1);
  useFrame(() => {
    const p = progressRef.current;
    if (Math.abs(p - last.current) > 0.001) {
      last.current = p;
      setProgress(p);
    }
  });
  return null;
}

function ShoeRig({
  url,
  progressRef,
}: {
  url: string;
  progressRef: React.MutableRefObject<number>;
}) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const baseScale = 10;

  const frames = useMemo<Keyframe[]>(
    () => [
      {
        t: 0.0,
        cameraPos: [0, 0.3, 9.0],
        target: [0, 0.0, 0],
        modelPos: [0, -0.15, 0],
        modelRot: [0.2, 0.65, 0.05],
        modelScale: 1.0,
      },

      {
        t: 0.25,
        cameraPos: [3.5, -2.65, 1.5],
        target: [-2, 1.95, 0],
        modelPos: [0, -0.18, 0],
        modelRot: [0, 0.5, -1.5],
        modelScale: 1.75,
      },

      {
        t: 0.35,
        cameraPos: [3.5, -2.65, 1.5],
        target: [-3, 1.65, -1],
        modelPos: [0, -0.18, 0],
        modelRot: [0.75, -1.25, 1.5],
        modelScale: 3.75,
      },

      {
        t: 0.45,
        cameraPos: [5.5, 0.65, -1.5],
        target: [-3, 1.65, -1],
        modelPos: [0, -0.18, 0],
        modelRot: [0.85, -1.25, 1.5],
        modelScale: 1.75,
      },

      {
        t: 0.55,
        cameraPos: [5.5, 2.65, -1.5],
        target: [1, 1.65, -0.5],
        modelPos: [0, -0.18, 0],
        modelRot: [1.05, -1.25, 1.02],
        modelScale: 1.75,
      },

      {
        t: 0.65,
        cameraPos: [5, 7.65, 2],
        target: [3, 3.65, -1.25],
        modelPos: [0, -0.18, 0],
        modelRot: [0.05, -1.25, 1.02],
        modelScale: 3.75,
      },

      {
        t: 0.75,
        cameraPos: [0, 8.65, 7.2],
        target: [0, 0.25, 0],
        modelPos: [0, -0.18, 0],
        modelRot: [0.05, -1.25, 1.02],
        modelScale: 1.75,
      },

      {
        t: 0.83,
        cameraPos: [1.2, 6, 4.2],
        target: [0, 0.25, 0],
        modelPos: [0, -16, 0],
        modelRot: [0.02, 0.25, 0.02],
        modelScale: 10,
      },

      {
        t: 0.92,
        cameraPos: [1.2, 5.65, 4.2],
        target: [0, 0.25, 0],
        modelPos: [0, -0.18, 0],
        modelRot: [0.05, 1.05, 0.02],
        modelScale: 1.95,
      },

      {
        t: 0.97,
        cameraPos: [0, 0.35, 7.2],
        target: [0, 0.05, 0],
        modelPos: [0, -0.16, 0],
        modelRot: [0.18, 0.75, 0.05],
        modelScale: 1.03,
      },

      {
        t: 1.0,
        cameraPos: [0, 0.3, 9.0],
        target: [0, 0.0, 0],
        modelPos: [0, -0.15, 0],
        modelRot: [0.2, 0.65, 0.05],
        modelScale: 1.0,
      },
    ],
    [],
  );

  useFrame(({ camera }) => {
    const p = progressRef.current;
    const f = sampleKeyframes(p, frames);

    camera.position.set(f.cameraPos[0], f.cameraPos[1], f.cameraPos[2]);
    camera.lookAt(f.target[0], f.target[1], f.target[2]);

    if (group.current) {
      group.current.position.set(f.modelPos[0], f.modelPos[1], f.modelPos[2]);
      group.current.rotation.set(f.modelRot[0], f.modelRot[1], f.modelRot[2]);
      group.current.scale.setScalar(f.modelScale * baseScale);
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

function SmoothProgressDriver({
  rawProgress,
  progressRef,
  damping = 8,
}: {
  rawProgress: number;
  progressRef: React.MutableRefObject<number>;
  damping?: number;
}) {
  useFrame((_, dt) => {
    const k = 1 - Math.exp(-damping * dt);
    progressRef.current =
      progressRef.current + (rawProgress - progressRef.current) * k;
  });
  return null;
}

function DebugProgress({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const last = useRef(-1);

  useFrame(() => {
    const p = progressRef.current;
    const step = Math.round(p * 100);
    if (step !== last.current) {
      last.current = step;
      console.log("progress:", p.toFixed(3));
    }
  });

  return null;
}

export function ScrollModelStory({
  url,
  containerHeightVh = 900,
}: {
  url: string;
  containerHeightVh?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rawProgress = useSectionScrollProgress(sectionRef);
  const progressRef = useRef(0);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(progressRef.current);
  }, []);

  const blocks = useMemo<TextBlock[]>(
    () => [
      {
        id: "b10",
        position: "left",
        tStart: 0.01,
        tEnd: 0.15,
        title: "Sneaker Studio Standard",
        text: "Original design, genuine leather, and modern comfort define our brand philosophy.",
      },
      {
        id: "b8",
        position: "bottom-left",
        tStart: 0.12,
        tEnd: 0.26,
        title: "Minimal Aesthetic",
        text: "A balanced mix of simplicity and detail creates a refined and versatile look.",
      },
      {
        id: "b2",
        position: "left",
        tStart: 0.20,
        tEnd: 0.34,
        title: "Urban Ready",
        text: "Made for city life, our sneakers match an active lifestyle and modern wardrobe.",
      },
      {
        id: "b3",
        position: "bottom-right",
        tStart: 0.22,
        tEnd: 0.38,
        title: "Authentic Design",
        text: "Clean lines and modern silhouettes create a timeless design that stays relevant beyond trends.",
      },
      {
        id: "b4",
        position: "top-left",
        tStart: 0.36,
        tEnd: 0.5,
        title: "Genuine Leather",
        text: "We use only carefully selected genuine treated leather to ensure comfort, durability, and a premium feel in every pair.",
      },
      {
        id: "b1",
        position: "right",
        tStart: 0.38,
        tEnd: 0.54,
        title: "Premium Materials",
        text: "High-quality materials are the foundation of our sneakers, delivering long-lasting wear and everyday comfort.",
      },
      {
        id: "b5",
        position: "right",
        tStart: 0.52,
        tEnd: 0.68,
        title: "Everyday Comfort",
        text: "Designed for all-day wear, our sneakers provide support, flexibility, and a comfortable fit.",
      },
      {
        id: "b9",
        position: "top-left",
        tStart: 0.5,
        tEnd: 0.66,
        title: "Comfort First",
        text: "Every detail is designed to make walking easier, softer, and more natural.",
      },
      {
        id: "b6",
        position: "top-right",
        tStart: 0.6,
        tEnd: 0.78,
        title: "Carefully Crafted",
        text: "From materials to fit, every pair is crafted with attention to detail and quality control.",
      },
      {
        id: "b7",
        position: "top-right",
        tStart: 0.78,
        tEnd: 0.94,
        title: "100% Original",
        text: "Every sneaker from sneaker-studio is fully authentic, original, and created to meet high quality standards.",
      },
    ],
    [],
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: `${containerHeightVh}vh`,
        background: "linear-gradient(180deg, #0b0b10 0%, #0a0a0e 100%)",
        overflow: "clip",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Canvas
            camera={{ position: [0, 0.25, 7.8], fov: 45, near: 0.1, far: 100 }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.55} />
            <directionalLight position={[3, 5, 4]} intensity={1.1} />

            <SmoothProgressDriver
              rawProgress={rawProgress}
              progressRef={progressRef}
              damping={8}
            />

            <DebugProgress progressRef={progressRef} />

            <ProgressBridge
              progressRef={progressRef}
              setProgress={setProgress}
            />

            <Suspense fallback={null}>
              <ShoeRig url={url} progressRef={progressRef} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>

          <TextOverlay progress={progress} blocks={blocks} />

          <div
            style={{
              position: "absolute",
              left: 14,
              bottom: 12,
              padding: "8px 10px",
              fontSize: 12,
              borderRadius: 12,
              background: "rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.14)",
              opacity: 0.75,
              pointerEvents: "none",
              color: "white",
            }}
          >
            Scroll: {Math.round(progress * 100)}%
          </div>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/models/shoe.glb");
