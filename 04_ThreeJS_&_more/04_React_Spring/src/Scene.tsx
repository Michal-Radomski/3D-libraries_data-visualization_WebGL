import React from "react";
import { animated, SpringRef, SpringValue, useSpring } from "@react-spring/three"; //* V1
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Scene = (): React.JSX.Element => {
  // const [click, setClick] = React.useState<boolean>(false);

  const meshRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material, Object3DEventMap>>(null);

  // const { scale, color }: { scale: SpringValue<number>; color: SpringValue<string> } = useSpring({
  //   from: { scale: click ? 1 : 2, color: click ? "orange" : "hotpink" },
  //   to: { scale: click ? 2 : 1, color: click ? "hotpink" : "orange" },
  // });
  // console.log("scale:", scale);

  // React.useEffect(() => {
  //   if (meshRef?.current) {
  //     console.log("meshRef?.current:", meshRef?.current);
  //   }
  // }, []);

  // const clickHandler = (): void => {
  //   setClick(!click);
  // };

  useFrame(() => {
    console.log("spring.x.get():", spring.x.get());
  });

  const [spring, api]: [spring: { x: SpringValue<number> }, api: SpringRef<{ x: number }>] = useSpring(() => ({
    from: { x: 0 },
  }));
  // console.log("spring:", spring);
  // console.log("api:", api);

  const handleClick = (): void => {
    api.start({
      to: { x: spring.x.get() === 1 ? 0 : 1 },
    });
  };

  return (
    <React.Fragment>
      <OrbitControls />

      {/* <animated.mesh onClick={clickHandler} scale={scale} ref={meshRef}>
        <animated.boxGeometry />
        <animated.meshBasicMaterial color={color} />
      </animated.mesh> */}

      <animated.mesh onClick={handleClick} position-x={spring.x} ref={meshRef}>
        <boxGeometry />
        <animated.meshBasicMaterial color="orange" />
      </animated.mesh>
    </React.Fragment>
  );
};

export default Scene;
