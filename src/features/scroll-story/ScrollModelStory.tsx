import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { TextOverlay } from "./components/TextOverlay";
import { HeroOverlay } from "./components/HeroOverlay";
import type { TextBlock } from "./helpers/types";
import { useSectionScrollProgress } from "./helpers/hooks";
import { DebugProgress, ProgressBridge, ShoeRig, SmoothProgressDriver } from "./components/canva-components";
import { ModelStoryFooter } from "./components/ModelStoryFooter";

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
        tStart: 0.2,
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
    <>
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
            style={{
              zIndex: 51,
              position: "absolute",
              inset: 0,
            }}
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

          <HeroOverlay progress={progress} />

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
              zIndex: 1000,
            }}
          >
            Scroll: {Math.round(progress * 100)}%
          </div>
        </div>
      </div>
    </section>
    <ModelStoryFooter />
    </>
  );
}

useGLTF.preload("/models/shoe.glb");
