import React from "react";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Torus } from "@react-three/drei";

const TorusComponent = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <React.Suspense>
        <Physics debug>
          <RigidBody colliders={"hull"} restitution={2}>
            <Torus />
          </RigidBody>

          <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
        </Physics>
      </React.Suspense>
    </React.Fragment>
  );
};

export default TorusComponent;
