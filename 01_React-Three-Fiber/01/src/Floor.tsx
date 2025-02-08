import React from "react";

const Floor = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[10]} />
        <meshStandardMaterial />
      </mesh>
    </React.Fragment>
  );
};

export default Floor;
