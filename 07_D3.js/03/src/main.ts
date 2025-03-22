//* Other possibilities: https://d3js.org/d3-scale-chromatic

import * as d3 from "d3";
// console.log("d3:", d3);

import "./style.scss";

interface ChartData2 {
  name: string;
  size: number;
}

(async function draw2(): Promise<void> {
  // Data
  const dataset = (await d3.json("./src/chartData2.json")) as ChartData2[];

  const sizeAccessor = (d: ChartData2) => d.size;
  const nameAccessor = (d: ChartData2) => d.name;

  // Dimensions
  const dimensions = {
    width: 200,
    height: 500,
    margin: 50,
  };

  // Draw Image
  const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const universeScale: d3.ScaleLogarithmic<number, number, never> = d3
    .scaleLog()
    .domain(d3.extent(dataset, sizeAccessor) as number[])
    .range([dimensions.height - dimensions.margin, dimensions.margin]);

  const circlesGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> = svg
    .append("g")
    .style("font-size", "16px")
    .style("dominant-baseline", "middle");

  circlesGroup
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", dimensions.margin)
    .attr("cy", (d: ChartData2) => universeScale(sizeAccessor(d)))
    .attr("r", 6);

  circlesGroup
    .selectAll("text")
    .data(dataset)
    .join("text")
    .attr("x", dimensions.margin + 15)
    .attr("y", (d: ChartData2) => universeScale(sizeAccessor(d)))
    .text(nameAccessor);

  const axis: d3.Axis<d3.NumberValue> = d3.axisLeft(universeScale);

  svg.append("g").attr("transform", `translate(${dimensions.margin}, 0)`).call(axis);
})();

async function draw(el: string, scale: string): Promise<void> {
  // Data
  const dataset = (await d3.json("./src/chartData.json")) as number[];
  dataset.sort((a: number, b: number) => a - b);

  // Dimensions
  const dimensions = {
    width: 600,
    height: 150,
  };

  const box = 30;

  // Draw Image
  const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3
    .select(el)
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  // Scales
  let colorScale;

  if (scale === "linear") {
    colorScale = d3
      .scaleLinear()
      .domain(d3.extent(dataset) as number[]) //* Min/max values
      .range(["white", "red"] as any) as Function;

    // console.log(1, "colorScale:", colorScale);
  } else if (scale === "quantize") {
    colorScale = d3
      .scaleQuantize()
      .domain(d3.extent(dataset) as number[])
      .range(["white", "pink", "red"] as any);

    // console.log(2, "colorScale:", colorScale);
    console.log("Quantize:", colorScale.thresholds());
  } else if (scale === "quantile") {
    colorScale = d3
      .scaleQuantile()
      .domain(dataset)
      .range(["white", "pink", "red"] as any);

    // console.log(3, "colorScale:", colorScale);
    console.log("Quantile:", colorScale.quantiles());
  } else if (scale === "threshold") {
    colorScale = d3
      .scaleThreshold()
      .domain([45200, 135600]) //* Threshold
      .range(d3.schemeReds[3] as unknown as number[]);

    // console.log(4, "colorScale:", colorScale);
  }
  // console.log("colorScale:", colorScale);

  // Rectangles
  svg
    .append("g")
    .attr("transform", "translate(2, 2)")
    .attr("stroke", "black")
    .selectAll("rect")
    .data(dataset)
    .join("rect")
    .attr("width", box - 3)
    .attr("height", box - 3)
    .attr("x", (_d: number, i: number) => box * (i % 20)) // 0, 30, 60
    .attr("y", (_d: number, i: number) => box * ((i / 20) | 0))
    .attr("fill", colorScale as unknown as string);
}

draw("#heatmap1", "linear");
draw("#heatmap2", "quantize");
draw("#heatmap3", "quantile");
draw("#heatmap4", "threshold");
