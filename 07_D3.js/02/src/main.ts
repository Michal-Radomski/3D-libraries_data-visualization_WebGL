import * as d3 from "d3";
// console.log("d3:", d3);

import "./style.scss";

interface DataSet {
  currently: { humidity: number; apparentTemperature: number };
}

//* Scatter Plot
(async function draw(): Promise<void> {
  // Data
  const dataset = (await d3.json("./src/weatherData.json")) as DataSet[];
  // console.log("dataset:", dataset);

  const xAccessor: (d: DataSet) => number = (d: DataSet) => d.currently.humidity; //* X axe (cause)
  const yAccessor: (d: DataSet) => number = (d: DataSet) => d.currently.apparentTemperature; //* Y axe (effect)
  // console.log({ xAccessor, yAccessor });

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
  // console.log("svg:", svg);

  const ctr: d3.Selection<SVGGElement, unknown, HTMLElement, any> = svg
    .append("g")
    .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);
  // console.log("ctr:", ctr);

  // Scales
  const xScale: d3.ScaleLinear<number, number, never> = d3
    .scaleLinear()
    .domain(d3.extent(dataset as DataSet[], xAccessor) as Iterable<d3.NumberValue>) //* min max values
    .rangeRound([0, dimensions.ctrWidth])
    .clamp(true);
  const yScale: d3.ScaleLinear<number, number, never> = d3
    .scaleLinear()
    .domain(d3.extent(dataset as DataSet[], yAccessor) as Iterable<d3.NumberValue>) //* min max values
    .rangeRound([dimensions.ctrHeight, 0])
    .nice()
    .clamp(true);

  // Draw Circles
  ctr
    .selectAll("circle")
    .data(dataset as DataSet[])
    .join("circle")
    .attr("cx", (d: DataSet) => xScale(xAccessor(d)))
    .attr("cy", (d: DataSet) => yScale(yAccessor(d)))
    .attr("r", 5)
    .attr("fill", "red")
    .attr("stroke", "blue")
    .attr("stroke-width", "2")
    .attr("data-temp", yAccessor);

  // Axes
  const xAxis: d3.Axis<d3.NumberValue> = d3
    .axisBottom(xScale)
    // .axisTop(xScale)
    .ticks(5)
    .tickFormat((d: d3.NumberValue) => (d as number) * 100 + "%");
  // .tickValues([0, 0.4, 0.5, 0.6, 0.7, 0.8, 1.0]);

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
    .text("Humidity [ % ]");

  const yAxis: d3.Axis<d3.NumberValue> = d3.axisLeft(yScale);

  const yAxisGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> = ctr.append("g").call(yAxis).classed("axis", true);

  yAxisGroup
    .append("text")
    .attr("x", -dimensions.ctrHeight / 2)
    .attr("y", -dimensions.margin.left + 15)
    .attr("fill", "black")
    .html("Temperature [ &deg; F ]") //* txt() method -> html entities don't work!
    .style("transform", "rotate(270deg)")
    .style("text-anchor", "middle");
})();
