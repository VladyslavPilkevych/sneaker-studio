import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

interface SceneProps {
  modelUrl: string;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export function Scene({ modelUrl }: SceneProps) {
  return (
    <div className="h-full w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <Model url={modelUrl} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/80 p-2 rounded text-xs backdrop-blur-sm">
        Use mouse to rotate and zoom
      </div>
    </div>
  );
}
