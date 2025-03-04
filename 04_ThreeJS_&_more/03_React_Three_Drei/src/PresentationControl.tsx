/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { PresentationControls } from "@react-three/drei";

const PresentationControl = (): React.JSX.Element => {
  return (
    <PresentationControls
      global
      polar={[-Math.PI / 3, Math.PI / 3]}
      azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      // @ts-expect-error
      config={{ mass: 2, tension: 500, friction: 26 }}
      snap={true}
    >
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="#B900F7" />
      </mesh>
    </PresentationControls>
  );
};

export default PresentationControl;
