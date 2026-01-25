import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

function Shoe({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export function ModelViewer({ url }: { url: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 4], fov: 45 }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1} />

      <Suspense fallback={null}>
        <Shoe url={url} />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={1.5}
        maxDistance={5.5}
        autoRotate={!hovered}
        autoRotateSpeed={-4}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}

useGLTF.preload("/models/shoe.glb");
