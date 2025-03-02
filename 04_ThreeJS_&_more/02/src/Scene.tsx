import React from "react";
import {
  useFrame,
  // extend, //* V1
  useThree,
  RootState,
  useLoader,
} from "@react-three/fiber";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/Addons.js"; //* V1
// extend({ OrbitControls: OrbitControls }); //* V1
import { OrbitControls } from "@react-three/drei"; //* V2

import Custom from "./Custom";
import Particles from "./Particles";

const Scene = (): React.JSX.Element => {
  const texture: THREE.Texture = useLoader(THREE.TextureLoader, "./img/1.png");
  // console.log("texture:", texture);

  const cubeRef =
    React.useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material, THREE.Object3DEventMap>>(
      null
    );

  const planeRef =
    React.useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material, THREE.Object3DEventMap>>(
      null
    );

  const { gl, camera } = useThree();
  console.log("gl:", gl);
  console.log("camera:", camera);
  // camera.position.x = 5;

  //* Equivalent of animate function
  useFrame((state: RootState, delta: number): void => {
    cubeRef.current!.rotation.y += delta;
    planeRef.current!.rotation.y += delta;
    state.camera.position.x = Math.sin(state.clock.elapsedTime);
    // console.log("state.clock.elapsedTime:", state.clock.elapsedTime);
  });

  return (
    <React.Fragment>
      {/* //* V1 */}
      {/* <orbitControls args={[camera, gl.domElement]} /> */}
      {/* //* V2 */}
      <OrbitControls />

      <Custom />
      <Particles />

      <axesHelper args={[3]} />
      <gridHelper args={[20, 20, 0xff0000, "cyan"]} />

      <group>
        <mesh ref={planeRef} position-x={-2}>
          <planeGeometry args={[4, 4]} />
          <meshBasicMaterial color="orange" side={THREE.DoubleSide} wireframe={false} map={texture} />
        </mesh>

        <mesh ref={cubeRef} position={[2, 0, 0]} scale={[1, 1, 1]}>
          <boxGeometry args={[2, 2, 2, 2, 2, 2]} />
          <meshBasicMaterial color="#7A00CA" wireframe={true} />
        </mesh>
      </group>
    </React.Fragment>
  );
};

export default Scene;
