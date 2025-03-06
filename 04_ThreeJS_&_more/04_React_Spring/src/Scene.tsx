import React from "react";
import { a, useSpring } from "react-spring";
// import { a, useSpring } from "@react-spring/three";

const Scene = (): React.JSX.Element => {
  const [click, setClick] = React.useState<boolean>(false);

  const { scale, color } = useSpring({
    from: { scale: click ? 1 : 2, color: click ? "orange" : "hotpink" },
    scale: click ? 2 : 1,
    color: click ? "hotpink" : "orange",
  });
  console.log("scale:", scale);

  const clickHandler = (): void => {
    setClick(!click);
  };

  return (
    <React.Fragment>
      <a.mesh onClick={clickHandler} scale={scale}>
        <boxGeometry />
        <a.meshBasicMaterial color={color} />
      </a.mesh>
    </React.Fragment>
  );
};

export default Scene;
