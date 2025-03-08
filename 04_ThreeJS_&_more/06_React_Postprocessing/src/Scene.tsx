import React from "react";
import { OrbitControls } from "@react-three/drei";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";

import { CustomElem } from "./Interfaces";
import Effect from "./Effect";

const Scene = (): CustomElem => {
  const circleRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material, Object3DEventMap>>(null);
  // console.log("circleRef:", circleRef);

  return (
    <React.Fragment>
      <OrbitControls />

      <Effect ref={circleRef} />

      <mesh position-x={1}>
        <boxGeometry />
        <meshBasicMaterial color="orange" />
      </mesh>

      <mesh position-x={-1}>
        <boxGeometry />
        <meshBasicMaterial color="rgb(106,115,180)" />
      </mesh>

      <mesh position-z={-12} ref={circleRef}>
        <circleGeometry args={[7, 64]} />
        <meshBasicMaterial color="orange" />
      </mesh>
    </React.Fragment>
  );
};

export default Scene;
