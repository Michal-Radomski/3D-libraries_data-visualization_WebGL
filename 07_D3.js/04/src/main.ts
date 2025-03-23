import * as d3 from "d3";
// console.log("d3:", d3);

import "./style.scss";

interface DataSet {
  currently: {
    humidity: number;
    apparentTemperature: number;
    temperature: number;
    dewPoint: number;
    windSpeed: number;
    cloudCover: number;
    ozone: number;
    [key: string]: number;
  };
}

(async function draw(): Promise<void> {
  // Data
  const dataset = (await d3.json("./src/weatherData.json")) as DataSet[];

  // Dimensions
  const dimensions = {
    width: 800,
    height: 400,
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
    .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`) as d3.Selection<
    SVGGElement,
    unknown,
    HTMLElement,
    any
  >;
  // console.log({ original: dataset, new: newDataset })

  const labelsGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> = ctr.append("g").classed("bar-labels", true);

  const xAxisGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> = ctr
    .append("g")
    .style("transform", `translateY(${dimensions.ctrHeight}px)`);

  const meanLine: d3.Selection<SVGLineElement, unknown, HTMLElement, any> = ctr.append("line").classed("mean-line", true);

  function histogram(metric: string): void {
    // console.log("metric:", metric);
    const xAccessor = (d: DataSet) => d.currently[metric as keyof typeof d.currently];

    const yAccessor = (d: DataSet[]) => {
      // console.log("d:", d);
      return d.length;
    };

    // Scales
    const xScale: d3.ScaleLinear<number, number, never> = d3
      .scaleLinear()
      .domain(d3.extent(dataset, xAccessor) as Iterable<d3.NumberValue>)
      .range([0, dimensions.ctrWidth as number])
      .nice(); //* Rounds values
    // console.log("xScale:", xScale);

    //* Formatting data
    const bin: d3.HistogramGeneratorNumber<number, number> = d3
      .bin()
      .domain(xScale.domain() as unknown as (values: Iterable<number>) => [number, number])
      .value(xAccessor as unknown as (d: number, i: number, data: ArrayLike<number>) => number)
      .thresholds(10);
    // console.log("bin:", bin);

    //* Formatted data
    const newDataset: d3.Bin<number, number>[] = bin(dataset as unknown as ArrayLike<number>);
    // console.log("newDataset:", newDataset);
    const padding = 1;

    const yScale: d3.ScaleLinear<number, number, never> = d3
      .scaleLinear()
      .domain([0, d3.max(newDataset as Iterable<DataSet[]>, yAccessor)] as Iterable<d3.NumberValue>)
      .range([dimensions.ctrHeight as number, 0])
      .nice();

    const exitTransition: d3.Transition<d3.BaseType, unknown, null, undefined> = d3.transition().duration(500);
    const updateTransition: d3.Transition<d3.BaseType, unknown, null, undefined> = exitTransition.transition().duration(500);

    // Draw Bars
    ctr
      .selectAll("rect")
      .data(newDataset)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("width", (d) => d3.max([0, xScale(d.x1 as number) - xScale(d.x0 as number) - padding]) as number)
            .attr("height", 0)
            .attr("x", (d) => xScale(d.x0 as number))
            .attr("y", dimensions.ctrHeight as number)
            .attr("fill", "#b8de6f"),
        (update) => update,
        (exit) =>
          exit
            .attr("fill", "#f39233")
            .transition(exitTransition)
            .attr("y", dimensions.ctrHeight as number)
            .attr("height", 0)
            .remove()
      )
      .transition(updateTransition)
      .attr("width", (d) => d3.max([0, xScale(d.x1 as number) - xScale(d.x0 as number) - padding]) as number)
      .attr("height", (d) => (dimensions.ctrHeight as number) - yScale(yAccessor(d as unknown as DataSet[])))
      .attr("x", (d) => xScale(d.x0 as number))
      .attr("y", (d) => yScale(yAccessor(d as unknown as DataSet[])))
      .attr("fill", "#01c5c4")
      .attr("stroke", "orangered");

    labelsGroup
      .selectAll("text")
      .data(newDataset)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("x", (d) => xScale(d.x0 as number) + (xScale(d.x1 as number) - xScale(d.x0 as number)) / 2)
            .attr("y", dimensions.ctrHeight as number)
            .text(yAccessor as unknown as string),
        (update) => update,
        (exit) =>
          exit
            .transition(exitTransition)
            .attr("y", dimensions.ctrHeight as number)
            .remove()
      )
      .transition(updateTransition)
      .attr("x", (d) => xScale(d.x0 as number) + (xScale(d.x1 as number) - xScale(d.x0 as number)) / 2)
      .attr("y", (d) => yScale(yAccessor(d as unknown as DataSet[])) - 10)
      .text(yAccessor as unknown as string);

    const mean = d3.mean(dataset, xAccessor) as number;
    // console.log("mean:", mean);

    meanLine
      .raise()
      .transition(updateTransition)
      .attr("x1", xScale(mean))
      .attr("y1", 0)
      .attr("x2", xScale(mean))
      .attr("y2", dimensions.ctrHeight as number);

    // Draw Axis
    const xAxis: d3.Axis<d3.NumberValue> = d3.axisBottom(xScale);

    xAxisGroup.transition().call(xAxis);
  }

  d3.select("#metric").on("change", function (event: Event): void {
    // console.log("event:", event);
    event.preventDefault();
    // histogram(this!.value);
    histogram((event?.target as HTMLSelectElement)?.value);
  });

  histogram("humidity");
})();
