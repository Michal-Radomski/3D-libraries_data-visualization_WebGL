import React from "react";

interface Props {
  position: [number, number, number];
  name: string;
}

const Box = (props: Props): React.JSX.Element => {
  return (
    <React.Fragment>
      <mesh {...props}>
        <boxGeometry />
        <meshBasicMaterial color={0x00ff00} wireframe={true} />
      </mesh>
    </React.Fragment>
  );
};

export default Box;
