import React from "react";
// import * as THREE from "three";
import {
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3DEventMap,
  MeshBasicMaterial,
  BoxGeometry,
  SphereGeometry,
} from "three";
import { RootState, ThreeEvent, useFrame } from "@react-three/fiber";

import { PropsForMesh } from "./Types";

const Box: React.FC<PropsForMesh> = (props: PropsForMesh): React.JSX.Element => {
  // console.log("props:", props);

  //* useMemo will act as cache for the geometry and return that instead of generating a new object.
  // const geometry:THREE.BoxGeometry = new THREE.BoxGeometry()
  const geometry: [BoxGeometry, SphereGeometry] = React.useMemo(() => [new BoxGeometry(), new SphereGeometry(0.785398)], []);
  // console.log("geometry:", geometry);

  const meshRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
  const materialRef = React.useRef<MeshBasicMaterial>(null);

  const [hovered, setHover] = React.useState<boolean>(false);
  const [rotate, setRotate] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    if (meshRef?.current && materialRef?.current) {
      // console.log("meshRef:", meshRef);
      // console.log("materialRef:", materialRef);
      console.log("meshRef.current.geometry.uuid:", meshRef.current.geometry.uuid);
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
        // onClick={() => console.log("click")}
        onClick={() => setCount((count + 1) % 2)}
        onDoubleClick={(event: ThreeEvent<MouseEvent>) => console.log("event:", event)}
        onPointerDown={() => setRotate(!rotate)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        geometry={geometry[count]}
      >
        <boxGeometry />
        <meshBasicMaterial color={hovered ? 0xff0000 : 0x00ff00} wireframe={props.wireframe} ref={materialRef} />
      </mesh>
    </React.Fragment>
  );
};

export default Box;
