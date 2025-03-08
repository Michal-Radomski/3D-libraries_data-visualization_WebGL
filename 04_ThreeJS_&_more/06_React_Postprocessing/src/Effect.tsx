import React from "react";
import {
  EffectComposer,
  Pixelation,
  Vignette,
  BrightnessContrast,
  ChromaticAberration,
  Scanline,
  Grid,
  DotScreen,
  Noise,
  Glitch,
  GodRays,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useControls } from "leva";
import { MathProps, RootState, useFrame } from "@react-three/fiber";
import { Vector2 } from "three";

const Effect: React.ForwardRefExoticComponent<object & React.RefAttributes<unknown>> = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (_props: object, ref: any) => {
    // console.log("_props:", _props);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scanline = React.useRef<MathProps<any>>(null);

    React.useEffect(() => {
      console.log("ref:", ref);
    });
    console.log("BlendFunction:", BlendFunction);

    const { brightness, contrast }: { brightness: number; contrast: number } = useControls({
      brightness: { value: 0, min: -1, max: 1, step: 0.01 },
      contrast: { value: 0, min: -1, max: 1, step: 0.01 },
    });

    useFrame((_: RootState, delta: number) => {
      scanline.current!.density += delta * 0.5;
    });

    return (
      <EffectComposer>
        <Pixelation granularity={10} />
        <Vignette offset={0.2} darkness={1.2} eskill={false} blendFunction={BlendFunction.NORMAL} />
        <BrightnessContrast brightness={brightness} contrast={contrast} />
        <ChromaticAberration offset={[0.02, 0.02]} />
        <Scanline density={7} ref={scanline} />
        <Grid scale={0.25} lineWidth={0.1} />
        <DotScreen scale={0.1} angle={Math.PI * 0.25} />
        <Noise />
        <Glitch
          delay={[1.5, 3.5] as unknown as Vector2}
          duration={[1, 10] as unknown as Vector2}
          strength={[3, 10.0] as unknown as Vector2}
          active={true}
          ratio={0.85}
        />
        {ref!.current! && <GodRays sun={ref!.current as never} samples={60} density={0.45} />}
      </EffectComposer>
    );
  }
);

export default Effect;
