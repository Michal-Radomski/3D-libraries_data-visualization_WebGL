import React from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";

import { PolyhedronArr, Position } from "./Types";

const Polyhedron = ({ position, polyhedron }: { position: Position; polyhedron: PolyhedronArr }): React.JSX.Element => {
  const meshRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
  const [count, setCount] = React.useState<number>(0);

  console.log("polyhedron:", polyhedron);

  useFrame((_, delta) => {
    meshRef.current!.rotation.x += delta;
    meshRef.current!.rotation.y += 0.5 * delta;
  });

  return (
    <mesh
      position={position}
      ref={meshRef}
      onPointerDown={() => {
        setCount((count + 1) % 3);
      }}
      geometry={polyhedron[count]}
    >
      <meshBasicMaterial color={"lime"} wireframe />
    </mesh>
  );
};

export default Polyhedron;
