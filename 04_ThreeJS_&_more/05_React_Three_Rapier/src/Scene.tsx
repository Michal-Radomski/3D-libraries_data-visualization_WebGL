import React from "react";
import { OrbitControls } from "@react-three/drei";

import { CustomElem } from "./Interfaces";
import PhysicsScene from "./PhysicsScene";

const Scene = (): CustomElem => {
  return (
    <React.Fragment>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 3]} castShadow={true} />
      <PhysicsScene />
    </React.Fragment>
  );
};

export default Scene;
