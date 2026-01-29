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

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useMemo(() => {
    if (!active) {
    }
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

  useEffect(() => {
    if (active) {
      setAnimState("entering");
      if (ref.current) {
        ref.current.scale.set(0.8, 0.8, 0.8);
        ref.current.rotation.y = direction * Math.PI * 0.2;
      }
    } else {
      setAnimState((prev) =>
        prev === "idle" || prev === "entering" ? "exiting" : "idle",
      );
    }
  }, [active, direction]);

  useFrame((_, delta) => {
    if (!ref.current) return;

    if (active && animState === "idle") {
      ref.current.rotation.y += delta * 0.1;
    }

    const speed = 4 * delta;

    if (animState === "entering") {
      let done = true;
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as THREE.Material;
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1, speed);
          if (Math.abs(mat.opacity - 1) > 0.01) done = false;
        }
      });

      ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), speed);

      const currentY = ref.current.rotation.y;
      ref.current.rotation.y = THREE.MathUtils.lerp(currentY, 0, speed);

      if (
        done &&
        Math.abs(ref.current.scale.x - 1) < 0.01 &&
        Math.abs(ref.current.rotation.y) < 0.05
      ) {
        setAnimState("idle");
        if (active) setIsTransitioning(false);
      }
    }

    if (animState === "exiting") {
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as THREE.Material;
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, speed);
        }
      });

      ref.current.rotation.y += delta * 1 * -direction;

      ref.current.scale.lerp(new THREE.Vector3(0.8, 0.8, 0.8), speed);
    }
  });

  return <primitive object={clonedScene} ref={ref} />;
}

export function CarouselScene() {
  const currentIndex = useCarouselStore((state) => state.currentIndex);
  const direction = useCarouselStore((state) => state.direction);

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
              url={model.glb || ""}
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
        {SNEAKER_MODELS.map((model) =>
          model.glb ? <Preload key={model.glb} all /> : null,
        )}
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/80 p-2 rounded text-xs backdrop-blur-sm pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
