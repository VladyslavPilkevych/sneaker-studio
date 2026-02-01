import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { sampleKeyframes } from "../helpers/utils";
import type { Keyframe } from "../helpers/types";


export function ProgressBridge({
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

export function ShoeRig({
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

export function SmoothProgressDriver({
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

export function DebugProgress({
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