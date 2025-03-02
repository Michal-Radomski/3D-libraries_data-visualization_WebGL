import React from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { AnimationClip } from "three";
import { GLTF } from "three-stdlib";
import { ObjectMap } from "@react-three/fiber";

const Model = (): React.JSX.Element => {
  const model: GLTF & ObjectMap = useGLTF("./model/dog.glb");
  const animations = useAnimations<AnimationClip>(model.animations, model.scene);
  // console.log("model:", model);
  // console.log("animations:", animations);

  React.useEffect(() => {
    animations.actions.Idle?.play();
  }, [animations.actions.Idle]);

  return (
    <React.Fragment>
      <primitive position-y={-0.4} object={model.scene} />;
    </React.Fragment>
  );
};

useGLTF.preload("./model/dog.glb");

export default Model;
