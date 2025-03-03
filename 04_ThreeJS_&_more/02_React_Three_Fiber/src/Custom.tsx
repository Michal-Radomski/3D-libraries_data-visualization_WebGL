import React from "react";
import * as THREE from "three";

const Custom = (): React.JSX.Element => {
  const positionArray: Float32Array<ArrayBuffer> = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);

  return (
    <React.Fragment>
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positionArray.length / 3}
            itemSize={3}
            array={positionArray}
            args={[positionArray, 3, undefined]}
          />
        </bufferGeometry>
        <meshBasicMaterial color="purple" side={THREE.DoubleSide} />
      </mesh>
    </React.Fragment>
  );
};

export default Custom;
