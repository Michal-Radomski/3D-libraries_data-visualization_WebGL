import React from "react";

import { TransformControls, OrbitControls } from "@react-three/drei";

const TransformControl = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <OrbitControls makeDefault />

      <TransformControls position-x={2} mode="translate">
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color="purple" />
        </mesh>
      </TransformControls>
    </React.Fragment>
  );
};

export default TransformControl;
