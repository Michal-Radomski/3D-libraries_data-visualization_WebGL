/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { Color, ColorRepresentation, Material, Object3D, Object3DEventMap } from "three";
import { ThreeEvent } from "@react-three/fiber";

export const Shoe = (): React.JSX.Element => {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const { nodes, materials } = useGLTF("/models/shoe-draco.glb") as {
    nodes: {
      [name: string]: Object3D<Object3DEventMap>;
    };
    materials: {
      [name: string]: Material;
    };
  };
  // console.log("nodes, materials:", nodes, materials);

  React.useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useControls("Shoe", () => {
    console.log("creating color pickers");

    // using forEach
    // const colorPickers = {}
    // Object.keys(materials).forEach((m) => {
    //   colorPickers[m] = {
    //     value: '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
    //     onChange: (v) => {
    //       materials[m].color = new Color(v)
    //     }
    //   }
    // })
    // return colorPickers

    // using reduce
    return Object.keys(materials).reduce(
      (acc, m) =>
        Object.assign(acc, {
          [m]: {
            value: "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
            onChange: (v: ColorRepresentation) => {
              // @ts-expect-error
              materials[m].color = new Color(v);
            },
          },
        }),
      {}
    );
  });

  // JSX of glTF created using the command
  // npx gltfjsx .\public\models\shoe-draco.glb

  return (
    <group
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        document.getElementById("Shoe." + (event.object as any).material.name)?.focus();
      }}
    >
      {/* @ts-ignore */}
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} />
      {/* @ts-ignore */}
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      {/* @ts-ignore */}
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
      {/* @ts-ignore */}
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      {/* @ts-ignore */}
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
      {/* @ts-ignore */}
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      {/* @ts-ignore */}
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      {/* @ts-ignore */}
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  );
};

useGLTF.preload("./models/shoe-draco.glb");
