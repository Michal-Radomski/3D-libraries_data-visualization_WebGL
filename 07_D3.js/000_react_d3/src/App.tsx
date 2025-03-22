import React from "react";
import * as d3 from "d3";

import "./style.scss";
import LinePlot from "./LinePlot";
import BarChart from "./BarChart";

const App: React.FC = (): React.JSX.Element => {
  const [data, setData] = React.useState<number[]>(() => d3.ticks(-2, 2, 200).map(Math.sin) as number[]);
  // console.log("data:", data);

  function onMouseMove(event: React.SyntheticEvent): void {
    const [x, y] = d3.pointer(event);
    // console.log({ x, y });
    // The Math.atan2(y, x) method in JavaScript calculates the arctangent of the quotient of its two arguments (y/x) and returns the angle in radians between the positive x-axis and the point (x,y)(x,y). The result is always in the range −π−π to ππ.
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }

  const barChartData: { year: string; value: number }[] = [
    { year: "2018", value: 10 },
    { year: "2019", value: 20 },
    { year: "2020", value: 30 },
    { year: "2021", value: 40 },
    { year: "2022", value: 50 },
  ];

  return (
    <React.Fragment>
      <h1>D3 with React and TypeScript</h1>
      <BarChart data={barChartData} />

      <hr />

      <div onMouseMove={onMouseMove}>
        <LinePlot data={data} width={1280} height={800} />
      </div>
    </React.Fragment>
  );
};

export default App;
