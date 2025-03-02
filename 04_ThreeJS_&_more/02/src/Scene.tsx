import React from "react";
import { useFrame, extend, useThree, RootState } from "@react-three/fiber";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "@react-three/drei"; // Temp

// extend({ OrbitControls: OrbitControls });

const Scene = (): React.JSX.Element => {
  const cubeRef =
    React.useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[],
        THREE.Object3DEventMap
      >
    >(null);
  const planeRef =
    React.useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[],
        THREE.Object3DEventMap
      >
    >(null);

  const { gl, camera } = useThree();
  console.log("gl:", gl);
  console.log("camera:", camera);
  camera.position.x = 5;

  useFrame((state: RootState, delta: number) => {
    cubeRef.current!.rotation.y += delta;
    planeRef.current!.rotation.y += delta;
    state.camera.position.x = Math.sin(state.clock.elapsedTime);
    // console.log("state.clock.elapsedTime:", state.clock.elapsedTime);
  });

  return (
    <React.Fragment>
      {/* <orbitControls args={[camera, gl.domElement]} /> */}
      <OrbitControls />

      <mesh ref={planeRef} position-x={-2}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color="orange" side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={cubeRef} position-x={2}>
        <boxGeometry />
        <meshBasicMaterial color="#7A00CA" />
      </mesh>
    </React.Fragment>
  );
};

export default Scene;
