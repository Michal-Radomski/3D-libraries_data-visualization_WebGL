import React from "react";
import { Canvas, ObjectMap, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, Sphere, Stats } from "@react-three/drei";

import "./App.scss";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

const App = (): React.JSX.Element => {
  const gltf: GLTF & ObjectMap = useLoader(GLTFLoader, "./monkey.glb");
  // console.log("gltf:", gltf);

  return (
    <React.Fragment>
      <Canvas camera={{ position: [-0.5, 1, 2] }} shadows={true}>
        <Environment
          files="/forest_slope_1k.hdr"
          // preset="forest"
          background={true}
          backgroundBlurriness={0.0}
        />
        <Sphere args={[0.25]} />
        <directionalLight position={[3.3, 1.0, 4.4]} castShadow={true} intensity={Math.PI * 2} />
        <primitive object={gltf.scene} position={[0, 1, 0]} children-0-castShadow={true} />
        {/* <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow={true}>
          <meshStandardMaterial />
        </Circle> */}
        <OrbitControls target={[0, 1, 0]} autoRotate={true} />
        <axesHelper args={[5]} />
        <Stats />
      </Canvas>
    </React.Fragment>
  );
};

export default App;
