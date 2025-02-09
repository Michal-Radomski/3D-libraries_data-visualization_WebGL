/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { MeshProps, RootState, useFrame } from "@react-three/fiber";
import { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap } from "three";

import useKeyboard from "./useKeyboard";

export default function Box(props: MeshProps): React.JSX.Element {
  const ref = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);

  const keyMap: Record<string, boolean> = useKeyboard();

  useFrame((_: RootState, delta: number) => {
    keyMap["KeyA"] && (ref.current!.position.x -= 1 * delta);
    keyMap["KeyD"] && (ref.current!.position.x += 1 * delta);
    keyMap["KeyW"] && (ref.current!.position.z -= 1 * delta);
    keyMap["KeyS"] && (ref.current!.position.z += 1 * delta);
  });

  return (
    <mesh ref={ref} {...props}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  );
}
