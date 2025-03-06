/* eslint-disable @typescript-eslint/ban-ts-comment */
//* V5
import React from "react";
import {
  // OrbitControls,
  useGLTF,
  useTexture,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  CameraControls,
} from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";
import { MathProps, ReactProps, RootState, useFrame } from "@react-three/fiber";

const Scene = (): React.JSX.Element => {
  const [active, setActive] = React.useState<boolean>(false);

  const meshPortalMaterialRef = React.useRef<MathProps<THREE.ShaderMaterial> & ReactProps<THREE.ShaderMaterial>>(null);
  const cameraControlsRef = React.useRef<CameraControls>(null);

  useFrame((_: RootState, delta: number) => {
    easing.damp(meshPortalMaterialRef.current!, "blend", active ? 1 : 0, 0.2, delta);
  });

  React.useEffect(() => {
    if (active) {
      cameraControlsRef.current?.setLookAt(0, 0, 3, 0, 0, 0, true);
    } else {
      cameraControlsRef.current?.setLookAt(0, 0, 5, 0, 0, 0, true);
    }
  }, [active]);

  const model = useGLTF("./model/1.glb");
  const texture = useTexture("./texture/1.png");

  const doubleClickHandler = (): void => {
    setActive(!active);
  };

  return (
    <React.Fragment>
      {/* <OrbitControls /> */}

      <CameraControls ref={cameraControlsRef} />

      <Text font="./fonts/bold.ttf" position={[0, 1.5, 0.1]} fontSize={0.6}>
        Eggs
        <meshBasicMaterial toneMapped={false} />
      </Text>

      <RoundedBox args={[3, 4, 0.1]} radius={0.1} onDoubleClick={doubleClickHandler}>
        {/* @ts-expect-error */}
        <MeshPortalMaterial ref={meshPortalMaterialRef} resolution={0} blur={0}>
          <primitive object={model.scene} scale={0.6} position-y={0.6} />

          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </React.Fragment>
  );
};

export default Scene;

// /* eslint-disable @typescript-eslint/ban-ts-comment */
// //* V4
// import React from "react";
// import {
//   OrbitControls,
//   MeshReflectorMaterial,
//   MeshWobbleMaterial,
//   MeshDistortMaterial,
//   GradientTexture,
//   Environment,
//   useCursor,
// } from "@react-three/drei";
// import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";

// const Scene = (): React.JSX.Element => {
//   const [hover, setHover] = React.useState<boolean>(false);
//   const planeRef =
//     React.useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material, THREE.Object3DEventMap>>(
//       null
//     );

//   useCursor(hover);

//   const { lerp } = THREE.MathUtils as { lerp: (x: number, y: number, t: number) => number };

//   useFrame(() => {
//     // @ts-expect-error
//     planeRef.current!.material.distort = lerp(planeRef.current!.material.distort, hover ? 0.4 : 0, hover ? 0.05 : 0.01);
//   });

//   React.useEffect(() => {
//     if (hover) {
//       // @ts-expect-error
//       planeRef.current!.material.distort = 0.4;
//     } else {
//       // @ts-expect-error
//       planeRef.current!.material.distort = 0;
//     }
//   }, [hover]);

//   return (
//     <React.Fragment>
//       <OrbitControls />
//       <ambientLight />
//       <Environment background={true} files="./envMap/3.hdr" />

//       <mesh>
//         <boxGeometry args={[1, 1, 1, 32, 32, 32]} />
//         <MeshWobbleMaterial color={"#F76E53"} factor={3} speed={0.4} />
//       </mesh>

//       <mesh rotation-x={-Math.PI * 0.5} position-y={-0.75}>
//         <planeGeometry args={[6, 6]} />
//         <MeshReflectorMaterial resolution={512} color={"gray"} blur={[1000, 1000]} mixBlur={1} mirror={1} />
//       </mesh>

//       <mesh ref={planeRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
//         <planeGeometry args={[2, 3, 64, 64]} />
//         <MeshDistortMaterial speed={3} distort={0}>
//           <GradientTexture colors={["aquamarine", "hotpink", "blue"]} stops={[0, 0.5, 1]} />
//         </MeshDistortMaterial>
//       </mesh>
//     </React.Fragment>
//   );
// };

// export default Scene;

//* V3
// import React from "react";
// import { OrbitControls, Text, Text3D, Center, Float, Html, PositionalAudio } from "@react-three/drei";
// import { Object3D, Object3DEventMap } from "three";

// const Scene = (): React.JSX.Element => {
//   const cubeRef = React.useRef<Object3D<Object3DEventMap>>(null) as React.RefObject<Object3D<Object3DEventMap>>;
//   const [play, setPlay] = React.useState<boolean>(false);

//   const clickHandler = (): void => {
//     setPlay(!play);
//   };

//   return (
//     <React.Fragment>
//       <OrbitControls />

//       <Text
//         fontSize={0.4}
//         color="orange"
//         font="./fonts/1.ttf" //* Monsarrat fonts
//         position-y={1.5}
//         rotation-y={Math.PI * 0.1}
//         maxWidth={2}
//         textAlign="center"
//       >
//         This is a Text
//       </Text>

//       <Center>
//         <Float speed={5} floatIntensity={4}>
//           {/* //* Monsarrat fonts -> https://gero3.github.io/facetype.js */}
//           <Text3D font="./fonts/2.json" height={1} size={1.1} letterSpacing={-0.1} bevelEnabled={true} bevelSegments={20}>
//             Hello
//             <meshNormalMaterial />
//           </Text3D>
//         </Float>
//       </Center>

//       <mesh position-x={1} ref={cubeRef}>
//         <boxGeometry />
//         <meshBasicMaterial color="orange" />
//         <Html position={[0.7, 0.5, 0.5]} wrapperClass="text" distanceFactor={5} occlude={[cubeRef]}>
//           React Three Fiber
//         </Html>
//       </mesh>

//       <mesh position-x={-1}>
//         <boxGeometry />
//         <meshBasicMaterial color="purple" />
//       </mesh>

//       {play && <PositionalAudio url="./sound/sound.mp3" autoplay={true} loop={true} distance={5} />}
//       <mesh onClick={clickHandler} position-x={-4}>
//         <boxGeometry />
//         <meshBasicMaterial color="deeppink" />
//       </mesh>
//     </React.Fragment>
//   );
// };

// export default Scene;

//* V2
// import React from "react";

// import CameraControl from "./CameraControl";
// import OrbitControl from "./OrbitControl";
// import PresentationControl from "./PresentationControl";
// import ScrollControl from "./ScrollControl";
// import TransformControl from "./TransformControl";
// import PivotControl from "./PivotControl";

// const Scene = (): React.JSX.Element => {
//   return (
//     <React.Fragment>
//       <CameraControl />
//       <OrbitControl />
//       <PresentationControl />
//       <ScrollControl />
//       <TransformControl />
//       <PivotControl />
//     </React.Fragment>
//   );
// };

// export default Scene;

//* V1
// import React from "react";
// import {
//   OrbitControls,
//   useHelper,
//   // Sparkles,
//   CameraShake,
//   // Stars,
//   // Sky,
//   // Cloud,
//   Environment,
//   Lightformer,
//   // Clouds,
//   CubeCamera,
//   // PerspectiveCamera,
// } from "@react-three/drei";
// import * as THREE from "three";
// import { useControls } from "leva";
// import { useFrame } from "@react-three/fiber";

// const Scene = (): React.JSX.Element => {
//   const cubeRef =
//     React.useRef<
//       THREE.Mesh<
//         THREE.BufferGeometry<THREE.NormalBufferAttributes>,
//         THREE.Material | THREE.Material[],
//         THREE.Object3DEventMap
//       >
//     >(null);

//   useFrame((_, delta) => {
//     cubeRef.current!.rotation.x += delta;
//     cubeRef.current!.rotation.y += delta;
//   });

//   const directionalLight = React.useRef<THREE.DirectionalLight>(null) as React.RefObject<THREE.DirectionalLight>;
//   useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

//   // const { sunPosition } = useControls("sky", {
//   //   sunPosition: { value: [0, 1, 0] },
//   // });

//   const { meshIntensity } = useControls("meshIntensity", {
//     meshIntensity: { value: 1, min: 0, max: 5 },
//   });

//   const { height, radius, scale } = useControls("ground", {
//     height: { value: 6, min: 0, max: 10 },
//     radius: { value: 60, min: 0, max: 100 },
//     scale: { value: 70, min: 0, max: 100 },
//   });

//   return (
//     <React.Fragment>
//       <ambientLight intensity={0.5} />
//       <directionalLight ref={directionalLight} castShadow={true} position={[0, 0, 5]} color="yellow" />

//       <OrbitControls />
//       {/* <Sparkles count={300} speed={0.2} opacity={3} color="#68C2ED" size={1} scale={[10, 10, 10]} />
//       <Stars radius={2} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

//       <Cloud opacity={1} speed={0.2} segments={40} />
//       <Clouds material={THREE.MeshBasicMaterial}>
//         <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="orange" opacity={0.2} />
//         <Cloud seed={1} scale={2} volume={5} color="hotpink" fade={100} opacity={0.2} />
//       </Clouds> */}

//       {/* <Sky sunPosition={sunPosition} /> */}
//       <Environment
//         files={"./envMap/1.hdr"}
//         // files={[
//         //   "./envMap/px.png",
//         //   "./envMap/nx.png",
//         //   "./envMap/py.png",
//         //   "./envMap/ny.png",
//         //   "./envMap/pz.png",
//         //   "./envMap/nz.png",
//         // ]}
//         ground={{
//           height: height,
//           radius: radius,
//           scale: scale,
//         }}
//       />

//       <CameraShake
//         maxYaw={0.01}
//         maxPitch={0.01}
//         maxRoll={0.01}
//         yawFrequency={0.5}
//         pitchFrequency={0.5}
//         rollFrequency={0.4}
//       />

//       <mesh position-z={-1} scale={5}>
//         <planeGeometry />
//         <meshBasicMaterial color="orange" />
//       </mesh>

//       <Lightformer position-z={-1} scale={5} color="orange" intensity={5} />

//       <mesh castShadow={true} position-y={1}>
//         <boxGeometry />
//         <meshStandardMaterial color="#C7CAC7" envMapIntensity={meshIntensity} />
//       </mesh>
//       <mesh receiveShadow={true} position-y={0} rotation-x={-Math.PI * 0.5}>
//         <planeGeometry args={[8, 8]} />
//         <meshStandardMaterial color="#CC3941" />
//       </mesh>

//       {/* <Environment background files="./envMap/2.hdr" /> */}

//       {/* <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} /> */}

//       <CubeCamera resolution={1024} frames={1}>
//         {(texture: THREE.Texture) => (
//           <mesh>
//             <sphereGeometry args={[1, 64, 64]} />
//             <meshStandardMaterial envMap={texture} roughness={0} metalness={0.9} />
//           </mesh>
//         )}
//       </CubeCamera>
//       <mesh ref={cubeRef} position-z={5}>
//         <boxGeometry />
//         <meshBasicMaterial color="purple" />
//       </mesh>
//     </React.Fragment>
//   );
// };

// export default Scene;
