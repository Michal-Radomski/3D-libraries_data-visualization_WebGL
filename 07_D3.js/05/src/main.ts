import * as d3 from "d3";
// console.log("d3:", d3);

import "./style.scss";

interface DataSet {
  close: string;
  date: string;
}

(async function draw(): Promise<void> {
  // Data
  const dataset = (await d3.csv("./src/data.csv")) as DataSet[];
  // console.log("dataset:", dataset);

  const parseDate = d3.timeParse("%Y-%m-%d");
  const xAccessor = (d: DataSet) => parseDate(d.date) as Date;
  const yAccessor = (d: DataSet) => parseInt(d.close) as number;

  // Dimensions
  const dimensions = {
    width: 1000,
    height: 500,
    margins: 50,
    ctrWidth: undefined as number | undefined,
    ctrHeight: undefined as number | undefined,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;

  // Draw Image
  const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr: d3.Selection<SVGGElement, unknown, HTMLElement, any> = svg
    .append("g") // <g>
    .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);

  const tooltip: d3.Selection<d3.BaseType, unknown, HTMLElement, any> = d3.select("#tooltip");
  const tooltipDot: d3.Selection<SVGCircleElement, unknown, HTMLElement, any> = ctr
    .append("circle")
    .attr("r", 5)
    .attr("fill", "#fc8781")
    .attr("stroke", "#444")
    .attr("stroke-width", 2)
    .style("opacity", 0)
    .style("pointer-events", "none");

  // Scales
  const yScale: d3.ScaleLinear<number, number, never> = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor) as Iterable<d3.NumberValue>)
    .range([dimensions.ctrHeight, 0])
    .nice();

  const xScale: d3.ScaleTime<number, number, never> = d3
    .scaleUtc() //* UTC dates
    .domain(d3.extent(dataset, xAccessor) as Iterable<d3.NumberValue>)
    .range([0, dimensions.ctrWidth]);
  // console.log("xScale(xAccessor(dataset[0])), dataset[0]:", xScale(xAccessor(dataset[0])), dataset[0]);

  const lineGenerator: d3.Line<[number, number]> = d3
    .line()
    .x((d) => xScale(xAccessor(d as unknown as DataSet)))
    .y((d) => yScale(yAccessor(d as unknown as DataSet)));
  // console.log(
  //   "lineGenerator(dataset as unknown as [number, number][]):",
  //   lineGenerator(dataset as unknown as [number, number][])
  // );

  ctr
    .append("path")
    .datum(dataset)
    .attr("d", lineGenerator as unknown as string)
    .attr("fill", "none")
    .attr("stroke", "#30475e")
    .attr("stroke-width", 2);

  // Axis
  const yAxis: d3.Axis<d3.NumberValue> = d3.axisLeft(yScale).tickFormat((d) => `$${d}`);

  ctr.append("g").call(yAxis);

  const xAxis: d3.Axis<Date | d3.NumberValue> = d3.axisBottom(xScale);

  ctr.append("g").style("transform", `translateY(${dimensions.ctrHeight}px)`).call(xAxis);

  // Tooltip
  ctr
    .append("rect")
    .attr("width", dimensions.ctrWidth)
    .attr("height", dimensions.ctrHeight)
    .style("opacity", 0)
    .on("touchmouse mousemove", function (event: MouseEvent): void {
      const mousePos: [number, number] = d3.pointer(event, this);
      // console.log("mousePos:", mousePos);
      // console.log("this:", this);
      const date: Date = xScale.invert(mousePos[0]);

      // Custom Bisector - left, center, right
      const bisector = d3.bisector(xAccessor).left; //* It tells you where a new element should be inserted to still have a sorted array
      // console.log("bisector:", bisector);
      const index: number = bisector(dataset, date);
      // console.log({ index });
      const stock: DataSet = dataset[index - 1];

      // Update Image
      tooltipDot
        .style("opacity", 1)
        .attr("cx", xScale(xAccessor(stock)))
        .attr("cy", yScale(yAccessor(stock)))
        .raise();

      tooltip
        .style("display", "block")
        .style("top", yScale(yAccessor(stock)) - 20 + "px")
        .style("left", xScale(xAccessor(stock)) + "px");

      tooltip.select(".price").text(`$${yAccessor(stock)}`);

      const dateFormatter: (date: Date) => string = d3.timeFormat("%B %-d, %Y");

      tooltip.select(".date").text(`${dateFormatter(xAccessor(stock))}`);
    })
    .on("mouseleave", function (_event: MouseEvent): void {
      tooltipDot.style("opacity", 0);
      tooltip.style("display", "none");
    });
})();
