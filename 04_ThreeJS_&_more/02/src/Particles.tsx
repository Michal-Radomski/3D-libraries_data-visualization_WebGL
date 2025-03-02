import React from "react";
import { useLoader, useFrame, RootState } from "@react-three/fiber";
import * as THREE from "three";

const Particles = (): React.JSX.Element => {
  const particles =
    React.useRef<
      THREE.Points<THREE.BufferGeometry<THREE.NormalOrGLBufferAttributes>, THREE.Material, THREE.Object3DEventMap>
    >(null);

  useFrame((_: RootState, delta: number) => {
    particles.current!.rotation.y += delta * 0.1;
    particles.current!.rotation.x += delta * 0.1;
  });

  const texture: THREE.Texture = useLoader(THREE.TextureLoader, "./img/snow.jpg");

  const verticesAmount = 2000;
  const positionArray: Float32Array<ArrayBuffer> = new Float32Array(verticesAmount * 3);

  for (let i = 0; i < verticesAmount * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 10.0;
  }

  return (
    <React.Fragment>
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positionArray.length / 3} // Should be divided by three
            itemSize={3}
            array={positionArray}
            args={[positionArray, 3, undefined]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} alphaMap={texture} transparent={true} depthTest={false} />
      </points>
    </React.Fragment>
  );
};

export default Particles;
