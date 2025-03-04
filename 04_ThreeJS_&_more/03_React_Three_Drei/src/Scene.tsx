/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import {
  OrbitControls,
  useHelper,
  Sparkles,
  CameraShake,
  Stars,
  Sky,
  Cloud,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

const Scene = (): React.JSX.Element => {
  const directionalLight = React.useRef<THREE.DirectionalLight>(null) as React.RefObject<THREE.DirectionalLight>;
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [0, 1, 0] },
  });

  const { meshIntensity } = useControls("meshIntensity", {
    meshIntensity: { value: 1, min: 0, max: 5 },
  });

  const { height, radius, scale } = useControls("ground", {
    height: { value: 6, min: 0, max: 10 },
    radius: { value: 60, min: 0, max: 100 },
    scale: { value: 70, min: 0, max: 100 },
  });

  return (
    <React.Fragment>
      <ambientLight intensity={0.5} />
      <directionalLight ref={directionalLight} castShadow={true} position={[0, 0, 5]} color="yellow" />

      <OrbitControls />
      <Sparkles count={300} speed={0.2} opacity={3} color="#68C2ED" size={1} scale={[10, 10, 10]} />
      <Stars radius={2} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* @ts-expect-error */}
      <Cloud opacity={1} speed={0.2} width={10} depth={1.5} segments={40} depthTest={false} />
      <Sky sunPosition={sunPosition} />
      <Environment
        files={"./envMap/1.hdr"}
        ground={{
          height: height,
          radius: radius,
          scale: scale,
        }}
      />

      <CameraShake
        maxYaw={0.01}
        maxPitch={0.01}
        maxRoll={0.01}
        yawFrequency={0.5}
        pitchFrequency={0.5}
        rollFrequency={0.4}
      />

      <mesh position-z={-1} scale={5}>
        <planeGeometry />
        <meshBasicMaterial color="orange" />
      </mesh>
      <Lightformer position-z={-1} scale={5} color="orange" intensity={5} />
      <Environment files="./envMap/1.hdr" ground={{ height: height, radius: radius, scale: scale }} />
      <mesh castShadow position-y={1}>
        <boxGeometry />
        <meshStandardMaterial color="#C7CAC7" envMapIntensity={meshIntensity} />
      </mesh>
      <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#CC3941" />
      </mesh>
    </React.Fragment>
  );
};

export default Scene;
