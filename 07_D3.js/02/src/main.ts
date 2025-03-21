import * as d3 from "d3";
// console.log("d3:", d3);

import "./style.scss";

(async function draw(): Promise<void> {
  // Data
  const dataset = await d3.json("./src/weatherData.json");
  // console.log("dataset:", dataset);

  const xAccessor = (d: { currently: { humidity: number } }) => d.currently.humidity;
  const yAccessor = (d: { currently: { apparentTemperature: number } }) => d.currently.apparentTemperature;

  // Dimensions
  const dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
    ctrWidth: undefined as number | undefined,
    ctrHeight: undefined as number | undefined,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.ctrHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // Draw Image
  const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr: d3.Selection<SVGGElement, unknown, HTMLElement, any> = svg
    .append("g")
    .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

  // Scales
  const xScale: d3.ScaleLinear<number, number, never> = d3
    .scaleLinear()
    .domain(d3.extent(dataset as any[], xAccessor) as any)
    .rangeRound([0, dimensions.ctrWidth])
    .clamp(true);
  const yScale: d3.ScaleLinear<number, number, never> = d3
    .scaleLinear()
    .domain(d3.extent(dataset as any[], yAccessor) as any[])
    .rangeRound([dimensions.ctrHeight, 0])
    .nice()
    .clamp(true);

  // Draw Circles
  ctr
    .selectAll("circle")
    .data(dataset as any[])
    .join("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("r", 5)
    .attr("fill", "red")
    .attr("data-temp", yAccessor);

  // Axes
  const xAxis: d3.Axis<d3.NumberValue> = d3
    .axisBottom(xScale)
    .ticks(5)
    .tickFormat((d: any) => d * 100 + "%")
    .tickValues([0.4, 0.5, 0.8]);

  const xAxisGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> = ctr
    .append("g")
    .call(xAxis)
    .style("transform", `translateY(${dimensions.ctrHeight}px)`)
    .classed("axis", true);

  xAxisGroup
    .append("text")
    .attr("x", dimensions.ctrWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .text("Humidity");

  const yAxis: d3.Axis<d3.NumberValue> = d3.axisLeft(yScale);

  const yAxisGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> = ctr.append("g").call(yAxis).classed("axis", true);

  yAxisGroup
    .append("text")
    .attr("x", -dimensions.ctrHeight / 2)
    .attr("y", -dimensions.margin.left + 15)
    .attr("fill", "black")
    .html("Temperature &deg; F")
    .style("transform", "rotate(270deg)")
    .style("text-anchor", "middle");
})();
