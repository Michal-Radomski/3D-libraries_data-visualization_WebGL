//* V2
import React from "react";
import { Physics, RigidBody, CuboidCollider, CapsuleCollider } from "@react-three/rapier";

import { CustomElem } from "./Interfaces";

// https://pmndrs.github.io/react-three-rapier/
// https://rapier.rs/docs/user_guides/javascript/colliders/#mass-properties

const PhysicsScene = (): CustomElem => {
  return (
    <React.Fragment>
      <Physics gravity={[0, -9.81, 0]} debug={true}>
        <RigidBody colliders={false} position={[1.5, 1.5, 0]}>
          <CuboidCollider args={[0.5, 0.5, 0.5]} />
          {/* <CuboidCollider args={[0.25, 0.25, 0.25]} position={[-2, -1, -2.5]} /> */}
          <mesh castShadow={true}>
            <boxGeometry />
            <meshStandardMaterial color="#CC3941" />
          </mesh>
        </RigidBody>

        <RigidBody colliders="trimesh">
          <mesh position={[-1.5, 1.5, 0]}>
            <torusKnotGeometry args={[0.5, 0.15, 100, 100]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 1.5, -1.5]}>
          <CapsuleCollider args={[0.375, 0.6]} />
          <mesh>
            <sphereGeometry args={[0.75, 64, 64]} />
            <meshStandardMaterial color="#23B278" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh position-y={-1} rotation-x={-Math.PI * 0.5} receiveShadow>
            <boxGeometry args={[8, 8, 0.35]} />
            <meshStandardMaterial color="#C7CAC7" />
          </mesh>
        </RigidBody>
      </Physics>
    </React.Fragment>
  );
};

export default PhysicsScene;

//* V1
// import React from "react";

// import { CustomElem } from "./Interfaces";
// import { Physics, RigidBody } from "@react-three/rapier";

// //* https://pmndrs.github.io/react-three-rapier

// const PhysicsScene = (): CustomElem => {
//   return (
//     <React.Fragment>
//       <Physics gravity={[0, -9.81, 0]}>
//         <RigidBody>
//           <mesh castShadow={true} position={[0, 1.5, 0]}>
//             <boxGeometry />
//             <meshStandardMaterial color="#CC3941" />
//           </mesh>
//           {/* <mesh castShadow={true} position={[0, 1.5, 0]} scale={[0.25, 3, 1]} position-z={-2}>
//             <boxGeometry />
//             <meshStandardMaterial color="#CC3941" />
//           </mesh> */}
//         </RigidBody>

//         <RigidBody>
//           <mesh castShadow={true} position={[0, 1.5, 0]} scale={[0.25, 3, 1]} position-z={-2}>
//             <boxGeometry />
//             <meshStandardMaterial color="#CC3941" />
//           </mesh>
//         </RigidBody>

//         <RigidBody type="fixed">
//           <mesh position-y={-1} rotation-x={-Math.PI * 0.5} receiveShadow={true}>
//             <boxGeometry args={[8, 8, 0.35]} />
//             <meshStandardMaterial color="#C7CAC7" />
//           </mesh>
//         </RigidBody>
//       </Physics>
//     </React.Fragment>
//   );
// };

// export default PhysicsScene;
