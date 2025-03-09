import React from "react";
import { KeyboardControls, OrbitControls } from "@react-three/drei";

import { CustomElem } from "./Interfaces";
import PhysicsScene from "./PhysicsScene";

const Scene = (): CustomElem => {
  return (
    <React.Fragment>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 3]} castShadow={true} />
      {/* <PhysicsScene /> */} //* V1
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <PhysicsScene /> //* V2
      </KeyboardControls>
    </React.Fragment>
  );
};

export default Scene;
