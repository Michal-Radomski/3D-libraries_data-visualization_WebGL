import React from "react";
import { Canvas, ObjectMap, useLoader } from "@react-three/fiber";
import { Circle, OrbitControls, Stats } from "@react-three/drei";

import "./App.scss";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

const App = (): React.JSX.Element => {
  const gltf: GLTF & ObjectMap = useLoader(GLTFLoader, "./monkey.glb");

  return (
    <React.Fragment>
      <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
        <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={Math.PI * 2} />
        <primitive object={gltf.scene} position={[0, 1, 0]} children-0-castShadow />
        <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
          <meshStandardMaterial />
        </Circle>
        <OrbitControls target={[0, 1, 0]} />
        <axesHelper args={[5]} />
        <Stats />
      </Canvas>
    </React.Fragment>
  );
};

export default App;
