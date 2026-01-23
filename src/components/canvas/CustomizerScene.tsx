import { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { useCustomizerStore } from "../../store/customizer-store";

// Clean InteractiveModel component that handles coloring and selection
function InteractiveModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { partColors, selectPart, selectedPart, setAvailableParts } =
    useCustomizerStore();

  // Clone scene so we don't mess up other views
  const [clonedScene] = useState(() => scene.clone());

  // Discover parts on mount
  useEffect(() => {
    const parts: string[] = [];
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        parts.push(child.name);
      }
    });
    setAvailableParts(parts);
  }, [clonedScene, setAvailableParts]);

  useFrame(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const color = partColors[mesh.name];

        if (color) {
          // Check if material is standard and apply color
          // We assume standard material for simplicity
          if ((mesh.material as THREE.MeshStandardMaterial).color) {
            (mesh.material as THREE.MeshStandardMaterial).color.set(color);
          }
        }

        // Highlight logic
        const isSelected = mesh.name === selectedPart;

        // We use emissive for highlighting.
        // Note: Ideally we should save the original emissive state, but for a sneaker viewer,
        // usually meshes don't have emissive unless they are lights.
        if (isSelected) {
          if ((mesh.material as THREE.MeshStandardMaterial).emissive) {
            (mesh.material as THREE.MeshStandardMaterial).emissive.set(
              "#333333",
            );
            (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
              0.5;
          }
        } else {
          if ((mesh.material as THREE.MeshStandardMaterial).emissive) {
            (mesh.material as THREE.MeshStandardMaterial).emissive.set(
              "#000000",
            );
            (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
          }
        }
      }
    });
  });

  return (
    <primitive
      object={clonedScene}
      onClick={(e: any) => {
        e.stopPropagation();
        selectPart(e.object.name);
      }}
      onPointerMissed={() => selectPart(null)}
    />
  );
}

export function CustomizerScene({ modelUrl }: { modelUrl: string }) {
  return (
    <div className="h-full w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden relative cursor-crosshair">
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.7} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Center>
          <InteractiveModel url={modelUrl} />
        </Center>
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/80 p-2 rounded text-xs backdrop-blur-sm pointer-events-none">
        Click parts to select • Drag to rotate
      </div>
    </div>
  );
}
