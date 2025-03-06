import React from "react";
import { animated, useSpring } from "@react-spring/three"; //* V1
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";

const Scene = (): React.JSX.Element => {
  const [click, setClick] = React.useState<boolean>(false);

  const meshRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material, Object3DEventMap>>(null);

  const { scale, color } = useSpring({
    from: { scale: click ? 1 : 2, color: click ? "orange" : "hotpink" },
    to: { scale: click ? 2 : 1, color: click ? "hotpink" : "orange" },
  });
  console.log("scale:", scale);

  React.useEffect(() => {
    if (meshRef?.current) {
      console.log("meshRef?.current:", meshRef?.current);
    }
  }, []);

  const clickHandler = (): void => {
    setClick(!click);
  };

  return (
    <React.Fragment>
      <animated.mesh onClick={clickHandler} scale={scale} ref={meshRef}>
        <animated.boxGeometry />
        <animated.meshBasicMaterial color={color} />
      </animated.mesh>
    </React.Fragment>
  );
};

export default Scene;
