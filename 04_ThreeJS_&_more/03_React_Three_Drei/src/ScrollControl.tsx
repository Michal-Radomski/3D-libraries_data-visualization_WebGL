import React from "react";
import { ScrollControls, Scroll, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { ObjectMap } from "@react-three/fiber";

import Images from "./Images";

const ScrollControl = (): React.JSX.Element => {
  const model: GLTF & ObjectMap = useGLTF("./model/model.gltf");

  return (
    <React.Fragment>
      <ambientLight intensity={4} />
      <directionalLight />

      <ScrollControls pages={3} damping={0.4} infinite horizontal>
        <Scroll>
          <Images />
          <primitive object={model.scene} position={[1.5, -1, 0]} scale={0.5} />
        </Scroll>

        {/* <Scroll html>
          <h1 style={{ position: "absolute", top: "60vh", left: "0.5em" }}>to</h1>
          <h1 style={{ position: "absolute", top: "120vh", left: "60vw" }}>be</h1>
          <h1
            style={{
              position: "absolute",
              top: "198.5vh",
              left: "0.5vw",
              fontSize: "40vw",
            }}
          >
            home
          </h1>
        </Scroll> */}
      </ScrollControls>
    </React.Fragment>
  );
};

export default ScrollControl;
