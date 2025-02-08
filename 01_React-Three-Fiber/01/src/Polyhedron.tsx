/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Color, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";

import { PolyhedronArr, Position } from "./Types";
import { useControls } from "leva";

const Polyhedron = ({
  position,
  polyhedron,
  rotation,
  visible,
  color,
  material,
  name,
}: {
  position: Position;
  polyhedron: PolyhedronArr;
  rotation?: [number, number, number];
  visible?: boolean;
  color?: string;
  material?: Material;
  name?: string;
}): React.JSX.Element => {
  console.log("color:", color);

  const meshRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
  const [count, setCount] = React.useState<number>(0);

  console.log("polyhedron:", polyhedron);

  useFrame((_, delta) => {
    meshRef.current!.rotation.x += delta;
    meshRef.current!.rotation.y += 0.5 * delta;
  });

  useControls(name as string, {
    wireframe: {
      value: false,
      onChange: (v: boolean) => {
        // console.log({ name });
        // console.log("meshRef.current!.material:", meshRef.current!.material);
        // @ts-ignore
        meshRef.current!.material.wireframe = v;
      },
    },
    flatShading: {
      value: true,
      onChange: (v: boolean) => {
        // console.log("v:", v);
        // @ts-ignore
        meshRef.current!.material.flatShading = v;
        // @ts-ignore
        meshRef.current!.material.needsUpdate = true;
      },
    },
    color: {
      value: "lime",
      onChange: (v: string) => {
        // console.log("v:", v);
        // @ts-ignore
        meshRef.current!.material.color = new Color(v);
      },
    },
  });

  return (
    <mesh
      rotation={rotation}
      visible={visible}
      position={position}
      ref={meshRef}
      onPointerDown={() => {
        setCount((count + 1) % 3);
      }}
      geometry={polyhedron[count]}
      material={material}
    >
      {/* <meshBasicMaterial color={color || "lime"} wireframe /> */}
      <icosahedronGeometry args={[1, 1]} />
      <axesHelper args={[1]} />
    </mesh>
  );
};

export default Polyhedron;
