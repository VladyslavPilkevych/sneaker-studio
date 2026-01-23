import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";
import { useCarouselStore } from "../../store/carousel-store";
import { SNEAKER_MODELS } from "../../data/models";

function Model({
  url,
  active,
  direction,
}: {
  url: string;
  active: boolean;
  direction: number;
}) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  const setIsTransitioning = useCarouselStore(
    (state) => state.setIsTransitioning,
  );

  // Clone the scene to avoid sharing state between instances if needed
  // Using useMemo to clone only when scene changes to be safe, though useGLTF usually caches.
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Initial state for non-active models
  useMemo(() => {
    if (!active) {
      // Reset to hidden state immediately if not active and not involved in a transition to avoid artifacts
      // But we want to handle entrance animation.
    }
    // Ensure materials are transparent capable
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => {
            m.transparent = true;
            m.opacity = active ? 1 : 0;
          });
        } else {
          (mesh.material as THREE.Material).transparent = true;
          (mesh.material as THREE.Material).opacity = active ? 1 : 0;
        }
      }
    });
  }, [clonedScene, active]);

  const [animState, setAnimState] = useState<"idle" | "entering" | "exiting">(
    active ? "idle" : "exiting",
  );

  // Sync internal animation state with active prop
  useEffect(() => {
    if (active) {
      setAnimState("entering");
      if (ref.current) {
        // Reset position/scale for entrance
        ref.current.scale.set(0.8, 0.8, 0.8);
        ref.current.rotation.y = direction * Math.PI * 0.2; // Retrieve from prop
      }
    } else {
      setAnimState((prev) =>
        prev === "idle" || prev === "entering" ? "exiting" : "idle",
      );
    }
  }, [active, direction]);

  useFrame((_, delta) => {
    if (!ref.current) return;

    // Standard rotation
    if (active && animState === "idle") {
      ref.current.rotation.y += delta * 0.1; // Slow idle spin
    }

    const speed = 4 * delta;

    if (animState === "entering") {
      // Fade In
      let done = true;
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as THREE.Material;
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1, speed);
          if (Math.abs(mat.opacity - 1) > 0.01) done = false;
        }
      });

      // Scale Up
      ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), speed);

      // Rotate to center
      // Target is rotation.y = 0 (plus some cumulative spin potentially, but let's keep it simple for now and center it)
      // Actually for idle spin we just add to it. Let's lerp rotation.y to 0 from offset
      const currentY = ref.current.rotation.y;
      // Damp rotation.y to roughly 0 (or some steady state).
      // For simplicity: lerp to 0 if we want it to settle, or just let idle spin take over.
      // Let's lerp to 0 then switch to idle.
      ref.current.rotation.y = THREE.MathUtils.lerp(currentY, 0, speed);

      if (
        done &&
        Math.abs(ref.current.scale.x - 1) < 0.01 &&
        Math.abs(ref.current.rotation.y) < 0.05
      ) {
        setAnimState("idle");
        // Notify store that transition is done only if we are the one entering
        if (active) setIsTransitioning(false);
      }
    }

    if (animState === "exiting") {
      // Fade Out
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as THREE.Material;
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, speed);
        }
      });

      // Rotate away slightly in opposite of entry
      ref.current.rotation.y += delta * 1 * -direction;

      // Scale down slightly
      ref.current.scale.lerp(new THREE.Vector3(0.8, 0.8, 0.8), speed);
    }
  });

  return <primitive object={clonedScene} ref={ref} />;
}

export function CarouselScene() {
  const currentIndex = useCarouselStore((state) => state.currentIndex);
  const direction = useCarouselStore((state) => state.direction);

  // We render ALL models but control their visibility/state
  // For performance with many models, we might only render curr, prev, next.
  // Given the list is small (3 models), rendering all is fine.

  return (
    <div className="h-full w-full rounded-lg overflow-hidden relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />

        <group position={[0, -0.5, 0]}>
          {SNEAKER_MODELS.map((model, index) => (
            <Model
              key={model.id}
              url={model.glbUrl}
              active={index === currentIndex}
              direction={direction}
            />
          ))}
        </group>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
        {SNEAKER_MODELS.map((model) => (
          <Preload key={model.glbUrl} all />
        ))}
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/80 p-2 rounded text-xs backdrop-blur-sm pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
