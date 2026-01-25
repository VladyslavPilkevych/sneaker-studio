import { Suspense, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function CenteredModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    const box = new THREE.Box3().setFromObject(groupRef.current);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    groupRef.current.position.sub(center);

    const maxAxis = Math.max(size.x, size.y, size.z);
    if (maxAxis > 0) {
      const scale = 2 / maxAxis;
      groupRef.current.scale.setScalar(scale);
    }
  }, [url]);

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
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
        <CenteredModel url={url} />
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
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}

useGLTF.preload("/models/shoe.glb");
