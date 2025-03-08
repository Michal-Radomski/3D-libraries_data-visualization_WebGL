import React from "react";
import { OrbitControls } from "@react-three/drei";
// import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

import { CustomElem } from "./Interfaces";
import PhysicsScene from "./PhysicsScene";

const Scene = (): CustomElem => {
  return (
    <React.Fragment>
      {/* <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer> */}

      <OrbitControls />

      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 3]} castShadow />

      <PhysicsScene />
    </React.Fragment>
  );
};

export default Scene;
