import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Side = "left" | "right";

type TextBlock = {
  id: string;
  side: Side;
  tStart: number;
  tEnd: number;
  title: string;
  text: string;
};

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

function TextOverlay({
  progress,
  blocks,
}: {
  progress: number;
  blocks: TextBlock[];
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      {blocks.map((b) => {
        const inT = smootherstep(b.tStart, b.tStart + 0.06, progress);
        const outT = 1 - smootherstep(b.tEnd - 0.06, b.tEnd, progress);
        const vis = clamp01(inT * outT);

        const xFrom = b.side === "left" ? -28 : 28;
        const xTo = b.side === "left" ? 0 : 0;
        const yFloat = mix(10, 0, smootherstep(0, 1, vis));

        const x = mix(xFrom, xTo, smootherstep(0, 1, vis));
        const sideStyle =
          b.side === "left"
            ? { left: "6%", right: "auto", textAlign: "left" as const }
            : { right: "6%", left: "auto", textAlign: "left" as const };

        return (
          <div
            key={b.id}
            style={{
              position: "absolute",
              top: "50%",
              transform: `translate(${x}px, ${-50 - yFloat}%)`,
              width: "min(360px, 42vw)",
              opacity: vis,
              filter: `blur(${mix(6, 0, vis)}px)`,
              ...sideStyle,
            }}
          >
            <div
              //   style={{
              //     background: "rgba(0,0,0,0.55)",
              //     border: "1px solid rgba(255,255,255,0.18)",
              //     borderRadius: 14,
              //     padding: "14px 14px 12px",
              //     boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
              //     backdropFilter: "blur(10px)",
              //   }}
              className="glass-panel w-full max-w-md lg:max-w-xs p-6 rounded-2xl shadow-glass flex flex-col gap-6"
            >
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

function ShoeRig({ url, progress }: { url: string; progress: number }) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  //   const baseScale = 0.01;
  const baseScale = 8;

  const frames = useMemo<Keyframe[]>(
    () => [
      {
        t: 0.0,
        cameraPos: [0, 0.25, 7.8],
        target: [0, 0, 0],
        modelPos: [0, -0.15, 0],
        modelRot: [0.2, 0.65, 0.05],
        modelScale: 1.0,
      },
      {
        t: 0.14,
        cameraPos: [0.95, 0.35, 4.2],
        target: [0, 0.05, 0],
        modelPos: [0, -0.18, 0],
        modelRot: [0.22, 1.05, 0.06],
        modelScale: 1.02,
      },
      {
        t: 0.28,
        cameraPos: [-0.95, 0.35, 4.2],
        target: [0, 0.05, 0],
        modelPos: [0, -0.18, 0],
        modelRot: [0.22, 0.25, 0.06],
        modelScale: 1.02,
      },
      {
        t: 0.42,
        cameraPos: [0.2, -1.1, 3.9],
        target: [0, -0.25, 0],
        modelPos: [0, -0.25, 0],
        modelRot: [1.25, 0.6, 0.1],
        modelScale: 1.04,
      },
      {
        t: 0.56,
        cameraPos: [0.1, -1.35, 3.6],
        target: [0, -0.35, 0.1],
        modelPos: [0, -0.28, 0],
        modelRot: [1.42, 0.85, 0.12],
        modelScale: 1.06,
      },
      {
        t: 0.7,
        cameraPos: [0.0, 0.2, -4.35],
        target: [0, 0, 0],
        modelPos: [0, -0.18, 0],
        modelRot: [0.1, 3.1, 0.03],
        modelScale: 1.02,
      },
      {
        t: 0.84,
        cameraPos: [1.35, 0.12, -3.95],
        target: [0, 0, 0],
        modelPos: [0, -0.18, 0],
        modelRot: [0.12, 2.55, 0.02],
        modelScale: 1.02,
      },
      {
        t: 1.0,
        cameraPos: [0, 0.3, 6.2],
        target: [0, 0, 0],
        modelPos: [0, -0.15, 0],
        modelRot: [0.2, 0.65, 0.05],
        modelScale: 1.0,
      },
    ],
    [],
  );

  useFrame(({ camera }) => {
    cameraRef.current = camera as THREE.PerspectiveCamera;
    const f = sampleKeyframes(progress, frames);

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

export function ScrollModelStory({
  url,
  containerHeightVh = 400,
}: {
  url: string;
  containerHeightVh?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useSectionScrollProgress(sectionRef);

  const blocks = useMemo<TextBlock[]>(
    () => [
      {
        id: "b1",
        side: "left",
        tStart: 0.03,
        tEnd: 0.16,
        title: "Первый взгляд",
        text: "Модель зафиксирована по центру. Скролл управляет движением камеры и поворотом, без ручного вращения.",
      },
      {
        id: "b2",
        side: "right",
        tStart: 0.12,
        tEnd: 0.26,
        title: "Левый угол",
        text: "Приближаемся к передней части под углом. Детали читаются лучше, а анимация идёт строго по траектории.",
      },
      {
        id: "b3",
        side: "left",
        tStart: 0.22,
        tEnd: 0.38,
        title: "Правый угол",
        text: "Переезд на другой угол. Скролл назад вернёт камеру и состояние текста в обратном порядке.",
      },
      {
        id: "b4",
        side: "right",
        tStart: 0.36,
        tEnd: 0.5,
        title: "Нижняя часть",
        text: "Камера уходит вниз и чуть разворачивается. Получается диагональный обзор снизу без рывков и зума мышью.",
      },
      {
        id: "b5",
        side: "left",
        tStart: 0.5,
        tEnd: 0.64,
        title: "Пролистываем низ",
        text: "Лёгкий проход вдоль нижней плоскости. Можно добавить больше кадров, если нужен акцент на конкретных деталях.",
      },
      {
        id: "b6",
        side: "right",
        tStart: 0.64,
        tEnd: 0.78,
        title: "Задняя сторона",
        text: "Переход на заднюю часть модели. Траектория камеры задаётся ключевыми кадрами и плавной интерполяцией.",
      },
      {
        id: "b7",
        side: "left",
        tStart: 0.78,
        tEnd: 0.94,
        title: "Боковой обзор",
        text: "Финальный боковой ракурс. В конце возвращаемся к стартовой позе, чтобы цикл выглядел цельно при прокрутке.",
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
            style={{ width: "100%", height: "100%" }}
            camera={{ position: [0, 0.25, 7.8], fov: 45, near: 0.1, far: 100 }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.55} />
            <directionalLight position={[3, 5, 4]} intensity={1.1} />
            <Suspense fallback={null}>
              <ShoeRig url={url} progress={progress} />
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
