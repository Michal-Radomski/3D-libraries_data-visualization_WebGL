import React from "react";
import { Grid, CameraControls } from "@react-three/drei";
import { button, buttonGroup, useControls } from "leva";
import * as THREE from "three";

const CameraControl = (): React.JSX.Element => {
  const cameraControlRef = React.useRef<CameraControls>(null);

  const { DEG2RAD }: { DEG2RAD: number } = THREE.MathUtils;
  // console.log("DEG2RAD:", DEG2RAD);

  // const cameraControls =
  useControls("Camera Controls", {
    horizontalRotation: buttonGroup({
      label: "Horizontal R",
      opts: {
        "45deg": () => cameraControlRef.current?.rotate(45 * DEG2RAD, 0, true),
        "-90deg": () => cameraControlRef.current?.rotate(-90 * DEG2RAD, 0, true),
        "360deg": () => cameraControlRef.current?.rotate(360 * DEG2RAD, 0, true),
      },
    }),
    verticalRotation: buttonGroup({
      label: "Vertical R",
      opts: {
        "20deg": () => cameraControlRef.current?.rotate(0, 20 * DEG2RAD, true),
        "-40deg": () => cameraControlRef.current?.rotate(0, -40 * DEG2RAD, true),
      },
    }),
    truckGroup: buttonGroup({
      label: "truck R",
      opts: {
        "(1,0)": () => cameraControlRef.current?.truck(1, 0, true),
        "(0,+1)": () => cameraControlRef.current?.truck(0, 1, true),
        "(-1,-1)": () => cameraControlRef.current?.truck(-1, -1, true),
      },
    }),
    zoomGroup: buttonGroup({
      label: "zoom",
      opts: {
        0.25: () => cameraControlRef.current?.zoom(0.25, true),
        "-0.25": () => cameraControlRef.current?.zoom(-0.25, true),
      },
    }),
    lookAtBox: button((): void => {
      cameraControlRef.current?.setLookAt(0, 1, 3, 0, 0, 0, true);
    }),
  });
  // console.log("cameraControls:", cameraControls);

  return (
    <React.Fragment>
      <CameraControls ref={cameraControlRef} smoothTime={0.25} />

      <Grid
        args={[30, 30]}
        cellSize={0.25}
        cellColor="#6f6f6f"
        sectionSize={1}
        sectionThickness={1.5}
        sectionColor="#6364A6"
        fadeDistance={20}
        fadeStrength={0.75}
      />

      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="#B900F7" />
      </mesh>
    </React.Fragment>
  );
};

export default CameraControl;
