import React from "react";
import { MeshProps, useFrame } from "@react-three/fiber";
import { BufferGeometry, Material, MathUtils, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { Color } from "three";

const black: Color = new Color("black");
// console.log("black:", black);

export default function Button(props: MeshProps): React.JSX.Element {
  // console.log("props:", props);

  // const ref = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null!);
  const ref = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
  const [hovered, setHovered] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<boolean>(false);

  const colorTo: Color = React.useMemo(() => new Color(Math.floor(Math.random() * 16777216)), []);

  useFrame(() => {
    ref.current!.rotation.x = hovered
      ? MathUtils.lerp(ref.current!.rotation.x, -Math.PI * 2, 0.025)
      : MathUtils.lerp(ref.current!.rotation.x, 0, 0.025);

    ref.current!.position.z = selected
      ? MathUtils.lerp(ref.current!.position.z, 0, 0.025)
      : MathUtils.lerp(ref.current!.position.z, -3, 0.025);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ref.current!.material.color.lerp(selected ? colorTo : black, 0.025);
  });

  return (
    <React.Fragment>
      <mesh
        {...props}
        ref={ref}
        onPointerDown={() => {
          setSelected(!selected);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry />
        <meshPhysicalMaterial roughness={0} metalness={0} thickness={3.12} ior={1.74} transmission={1.0} />
      </mesh>
    </React.Fragment>
  );
}
