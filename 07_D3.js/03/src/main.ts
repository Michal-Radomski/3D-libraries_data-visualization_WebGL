import * as d3 from "d3";
// console.log("d3:", d3);

import "./style.scss";

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
