//* V3
import React from "react";
import { OrbitControls, Text, Text3D, Center, Float, Html } from "@react-three/drei";
import { Object3D, Object3DEventMap } from "three";

const Scene = (): React.JSX.Element => {
  const cubeRef = React.useRef<Object3D<Object3DEventMap>>(null) as React.RefObject<Object3D<Object3DEventMap>>;

  return (
    <React.Fragment>
      <OrbitControls />

      <Text
        fontSize={0.4}
        color="orange"
        font="./fonts/1.ttf" //* Monsarrat fonts
        position-y={1.5}
        rotation-y={Math.PI * 0.1}
        maxWidth={2}
        textAlign="center"
      >
        This is a Text
      </Text>

      <Center>
        <Float speed={5} floatIntensity={4}>
          {/* //* Monsarrat fonts - https://gero3.github.io/facetype.js */}
          <Text3D font="./fonts/2.json" height={1} size={1.1} letterSpacing={-0.1} bevelEnabled={true} bevelSegments={20}>
            Hello
            <meshNormalMaterial />
          </Text3D>
        </Float>
      </Center>

      <mesh position-x={1} ref={cubeRef}>
        <boxGeometry />
        <meshBasicMaterial color="orange" />
        <Html position={[-0.7, 0.5, 0.5]} wrapperClass="text" distanceFactor={5} occlude={[cubeRef]}>
          R3F
        </Html>
      </mesh>

      <mesh position-x={-1}>
        <boxGeometry />
        <meshBasicMaterial color="purple" />
      </mesh>
    </React.Fragment>
  );
};

export default Scene;

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
