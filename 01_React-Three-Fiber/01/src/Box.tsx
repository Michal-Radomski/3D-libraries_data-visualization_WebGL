import React from "react";
import { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap, MeshBasicMaterial } from "three";
import { RootState, ThreeEvent, useFrame } from "@react-three/fiber";

interface Props {
  position: [number, number, number];
  name?: string;
  wireframe: boolean;
}

const Box: React.FC<Props> = (props: Props): React.JSX.Element => {
  // console.log("props:", props);

  const meshRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
  const materialRef = React.useRef<MeshBasicMaterial>(null);

  const [hovered, setHover] = React.useState<boolean>(false);
  const [rotate, setRotate] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (meshRef?.current && materialRef?.current) {
      // console.log("meshRef:", meshRef);
      console.log("materialRef:", materialRef);
    }
  }, []);

  // The useFrame hook is invoked continually, and on desktop, will try to maintain a rate of 60 frames per second.
  useFrame((_state: RootState, delta: number) => {
    // console.log("_state", _state);
    // console.log("delta:", delta);
    if (rotate) {
      meshRef.current!.rotation.x += 1 * delta;
      meshRef.current!.rotation.y += 0.5 * delta;
      meshRef.current!.rotation.y = Math.sin(_state?.clock?.getElapsedTime());
    }
  });

  return (
    <React.Fragment>
      <mesh
        {...props}
        ref={meshRef}
        scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
        // onPointerDown={(event: ThreeEvent<PointerEvent>) => console.log("pointer down " + event.object.name)}
        // onPointerUp={(event: ThreeEvent<PointerEvent>) => console.log("pointer up " + event.object.name)}
        // onPointerOver={(event: ThreeEvent<PointerEvent>) => console.log("pointer over " + event.object.name)}
        // onPointerOut={(event: ThreeEvent<PointerEvent>) => console.log("pointer out " + event.object.name)}
        // onUpdate={(self: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>) =>
        //   console.log("self:", self)
        // }
        // onWheel={() => console.log("wheel spins")}
        onClick={() => console.log("click")}
        onDoubleClick={(event: ThreeEvent<MouseEvent>) => console.log("event:", event)}
        onPointerDown={() => setRotate(!rotate)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry />
        <meshBasicMaterial color={hovered ? 0xff0000 : 0x00ff00} wireframe={props.wireframe} ref={materialRef} />
      </mesh>
    </React.Fragment>
  );
};

export default Box;
