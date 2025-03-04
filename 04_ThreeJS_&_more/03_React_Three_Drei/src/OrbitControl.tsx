import React from "react";
import { OrbitControls } from "@react-three/drei";

const OrbitControl = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        autoRotate={true}
        autoRotateSpeed={8}
        maxAzimuthAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2}
        maxPolarAngle={Math.PI / 4}
        minPolarAngle={-Math.PI / 4}
      />

      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="#B900F7" />
      </mesh>
    </React.Fragment>
  );
};

export default OrbitControl;
