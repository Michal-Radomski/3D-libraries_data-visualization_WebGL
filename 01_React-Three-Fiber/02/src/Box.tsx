/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { MeshProps, RootState, useFrame } from "@react-three/fiber";
import { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap } from "three";

interface PropsI extends MeshProps {
  selected?: boolean;
  keyMap: Record<string, boolean>;
}

export default function Box(props: PropsI): React.JSX.Element {
  const ref = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);

  const [selected, setSelected] = React.useState<boolean>(props.selected || false);

  const keyMap: Record<string, boolean> = props.keyMap;

  useFrame((_: RootState, delta: number) => {
    keyMap["KeyA"] && selected && (ref.current!.position.x -= 1 * delta);
    keyMap["KeyD"] && selected && (ref.current!.position.x += 1 * delta);
    keyMap["KeyW"] && selected && (ref.current!.position.z -= 1 * delta);
    keyMap["KeyS"] && selected && (ref.current!.position.z += 1 * delta);
  });

  return (
    <mesh ref={ref} {...props} onPointerDown={() => setSelected(!selected)}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe={!selected} />
    </mesh>
  );
}
