import * as d3 from "d3";
// console.log("d3:", d3);

import "./style.scss";

async function draw(el: string): Promise<void> {
  // Data
  const dataset = (await d3.json("./src/chartData.json")) as number[];
  // console.log("dataset:", dataset);

  // Dimensions
  const dimensions = {
    width: 600,
    height: 150,
  };

  // Draw Image
  const svg = d3.select(el).append("svg").attr("width", dimensions.width).attr("height", dimensions.height);
}

draw("#heatmap1");
