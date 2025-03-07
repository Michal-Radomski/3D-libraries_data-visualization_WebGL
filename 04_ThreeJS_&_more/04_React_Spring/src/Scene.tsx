//* V5
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { animated, SpringValue, useTrail } from "@react-spring/three";

const Scene = (): React.JSX.Element => {
  const [trail, api] = useTrail(3, () => ({
    from: { scale: 0 },
  }));

  let active: boolean = true;

  const missedHandler = (): void => {
    if (active) {
      active = false;

      api.start({
        to: { scale: 0.6 },
      });
    } else {
      active = true;

      api.start({
        to: { scale: 0.0 },
      });
    }
  };

  return (
    <React.Fragment>
      <OrbitControls />

      {trail.map((item: { scale: SpringValue<number> }, index: number) => (
        <animated.mesh key={index} scale={item.scale} position-x={-1 + index} onPointerMissed={missedHandler}>
          <boxGeometry />
          <meshBasicMaterial color="orange" />
        </animated.mesh>
      ))}
    </React.Fragment>
  );
};

export default Scene;

//* V4
// import React from "react";
// import { OrbitControls } from "@react-three/drei";
// import { animated, SpringValue, useSprings } from "@react-spring/three";
// import { Vector3 } from "three";

// const items = [
//   {
//     initialPosition: [-3.5, 0, 0],
//     finalPosition: [-1.5, 0, 0],
//   },
//   {
//     initialPosition: [0, 3.5, 0],
//     finalPosition: [0, 0, 0],
//   },
//   {
//     initialPosition: [3.5, 0, 0],
//     finalPosition: [1.5, 0, 0],
//   },
// ] as { initialPosition: number[]; finalPosition: number[] }[];

// const Scene = (): JSX.Element => {
//   const springs = useSprings(
//     items.length,
//     items.map((item: { initialPosition: number[]; finalPosition: number[] }) => ({
//       from: { position: item.initialPosition },
//       to: { position: item.finalPosition },
//     }))
//   ) as { position: SpringValue<number[]> }[];
//   console.log("springs:", springs);

//   return (
//     <React.Fragment>
//       <OrbitControls />

//       {springs.map((item, index) => (
//         <animated.mesh scale={0.5} position={item.position as unknown as Vector3} key={index}>
//           <boxGeometry />
//           <meshBasicMaterial color="orange" wireframe={true} />
//         </animated.mesh>
//       ))}
//     </React.Fragment>
//   );
// };

// export default Scene;

//* V3
// import React from "react";
// import { animated, Lookup, SpringRef, useSpring, useSpringRef } from "@react-spring/three";

// const Scene = (): React.JSX.Element => {
//   // const [spring, api] = useSpring(() => ({
//   //   from: { x: -2 },
//   // }));
//   // console.log("api:", api);

//   const springRef: SpringRef<Lookup<unknown>> = useSpringRef();

//   const spring = useSpring({
//     ref: springRef,
//     from: { x: -2 },
//   });

//   const clickHandler = (): void => {
//     springRef.start({
//       to: { x: 2 },
//       config: { duration: 5000 },
//     });
//   };

//   const pointerOverHandler = (): void => {
//     springRef.pause();
//   };

//   const pointerOutHandler = (): void => {
//     springRef.resume();
//   };

//   return (
//     <React.Fragment>
//       <animated.mesh
//         position-x={spring.x}
//         onClick={clickHandler}
//         onPointerOver={pointerOverHandler}
//         onPointerOut={pointerOutHandler}
//       >
//         <boxGeometry />
//         <meshBasicMaterial color="orange" />
//       </animated.mesh>
//     </React.Fragment>
//   );
// };

// export default Scene;

//* V2
// import React from "react";
// import { animated, useSpring } from "@react-spring/three";

// const Scene = (): React.JSX.Element => {
//   const [clicked, setClicked]: [clicked: boolean, setClicked: React.Dispatch<React.SetStateAction<boolean>>] =
//     React.useState<boolean>(false);

//   let n: number = 0;
//   const { x, y, color } = useSpring({
//     from: { color: "hotpink", x: -2, y: 0 },
//     // to: { color: "yellow", x: 2, y: -1 },
//     to: [
//       { color: "yellow", x: 2 },
//       { color: "cyan", y: 2 },
//       { color: "greenyellow", x: -2 },
//       { color: "hotpink", y: -2 },
//     ],
//     loop: () => 3 > n++, //should return a boolean value
//     delay: 1000,
//     // Reverse: clicked,
//     pause: clicked,
//     // Reset: clicked,
//     config: {
//       mass: 20,
//       tension: 700,
//       friction: 15,
//       clamp: false,
//       // duration: 500
//       // velocity: 0,
//     },
//     onStart: () => console.log("onStart"),
//     onRest: () => console.log("onRest"),
//     onPause: () => console.log("onPause"),
//     onResume: () => console.log("onResume"),
//   });

//   const clickHandler = (): void => {
//     setClicked(!clicked);
//   };

//   return (
//     <React.Fragment>
//       <animated.mesh position-x={x} rotation-y={x} position-y={y} onClick={clickHandler}>
//         <boxGeometry />
//         <animated.meshBasicMaterial color={color} />
//       </animated.mesh>
//     </React.Fragment>
//   );
// };

// export default Scene;

//* V1
// import React from "react";
// import { animated, SpringRef, SpringValue, useSpring } from "@react-spring/three"; //* V1
// import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
// import { useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";

// const Scene = (): React.JSX.Element => {
//   // const [click, setClick] = React.useState<boolean>(false);

//   const meshRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material, Object3DEventMap>>(null);

//   // const { scale, color }: { scale: SpringValue<number>; color: SpringValue<string> } = useSpring({
//   //   from: { scale: click ? 1 : 2, color: click ? "orange" : "hotpink" },
//   //   to: { scale: click ? 2 : 1, color: click ? "hotpink" : "orange" },
//   // });
//   // console.log("scale:", scale);

//   // React.useEffect(() => {
//   //   if (meshRef?.current) {
//   //     console.log("meshRef?.current:", meshRef?.current);
//   //   }
//   // }, []);

//   // const clickHandler = (): void => {
//   //   setClick(!click);
//   // };

//   useFrame(() => {
//     console.log("spring.x.get():", spring.x.get());
//   });

//   const [spring, api]: [spring: { x: SpringValue<number> }, api: SpringRef<{ x: number }>] = useSpring(() => ({
//     from: { x: 0 },
//   }));
//   // console.log("spring:", spring);
//   // console.log("api:", api);

//   const handleClick = (): void => {
//     api.start({
//       to: { x: spring.x.get() === 1 ? 0 : 1 },
//     });
//   };

//   return (
//     <React.Fragment>
//       <OrbitControls />

//       {/* <animated.mesh onClick={clickHandler} scale={scale} ref={meshRef}>
//         <animated.boxGeometry />
//         <animated.meshBasicMaterial color={color} />
//       </animated.mesh> */}

//       <animated.mesh onClick={handleClick} position-x={spring.x} ref={meshRef}>
//         <boxGeometry />
//         <animated.meshBasicMaterial color="orange" />
//       </animated.mesh>
//     </React.Fragment>
//   );
// };

// export default Scene;
