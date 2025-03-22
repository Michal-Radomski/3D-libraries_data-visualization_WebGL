import React from "react";
import * as d3 from "d3";

const LinePlot = ({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}: {
  data: number[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}): React.JSX.Element => {
  const x: d3.ScaleLinear<number, number, never> = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const y: d3.ScaleLinear<number, number, never> = d3.scaleLinear(d3.extent(data as unknown), [
    height - marginBottom,
    marginTop,
  ]);
  // console.log({ x, y });

  const line: d3.Line<d3.NumberValue> = d3.line((_d: d3.NumberValue, i: number) => x(i), y);
  return (
    <React.Fragment>
      <svg width={width} height={height}>
        <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data) as string} />
        <g fill="whitesmoke" stroke="currentColor" strokeWidth="1.5">
          {data.map((d: d3.NumberValue, i: number) => (
            <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
          ))}
        </g>
      </svg>
    </React.Fragment>
  );
};

export default LinePlot;
