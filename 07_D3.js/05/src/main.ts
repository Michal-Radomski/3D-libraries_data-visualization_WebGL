import * as d3 from "d3";
// console.log("d3:", d3);

import "./style.scss";

interface DataSet3 {
  name: string;
  " <10": number | string;
  "10-19": number | string;
  "20-29": number | string;
  "30-39": number | string;
  "40-49": number | string;
  "50-59": number | string;
  "60-69": number | string;
  "70-79": number | string;
  "≥80": number | string;
  total: number;
}

(async function draw3(): Promise<void> {
  // Data
  const dataset = (await d3.csv("./src/data3.csv", (d, _index: number, columns: string[]) => {
    d3.autoType(d);
    (d as unknown as DataSet3).total = d3.sum(columns, (c) => d[c] as unknown as number);
    return d as unknown as DataSet3;
  })) as unknown as DataSet3[];

  dataset.sort((a, b) => b.total - a.total);

  // Dimensions
  const dimensions = {
    width: 1000,
    height: 600,
    margins: 20,
    ctrWidth: undefined as number | undefined,
    ctrHeight: undefined as number | undefined,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;

  // Draw Image
  const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3
    .select("#chart3")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr: d3.Selection<SVGGElement, unknown, HTMLElement, any> = svg
    .append("g")
    .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);

  // Scales
  const stackGenerator = d3.stack().keys((dataset as any).columns.slice(1));
  const stackData = stackGenerator(dataset as any).map((ageGroup) => {
    ageGroup.forEach((state: any) => {
      state.key = ageGroup.key;
    });

    return ageGroup;
  });

  const yScale: d3.ScaleLinear<number, number, never> = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(stackData, (ag) => {
        return d3.max(ag, (state) => state[1]);
      }),
    ] as [number, number])
    .rangeRound([dimensions.ctrHeight, dimensions.margins]);

  const xScale: d3.ScaleBand<string> = d3
    .scaleBand()
    .domain(dataset.map((state) => state.name))
    .range([dimensions.margins, dimensions.ctrWidth])
    // .paddingInner(0.1)
    // .paddingOuter(0.1)
    .padding(0.1);

  const colorScale: d3.ScaleOrdinal<string, unknown, string> = d3
    .scaleOrdinal()
    .domain(stackData.map((d) => d.key))
    .range(d3.schemeSpectral[stackData.length])
    .unknown("#ccc");

  // Draw Bars
  const ageGroups = ctr
    .append("g")
    .classed("age-groups", true)
    .selectAll("g")
    .data(stackData)
    .join("g")
    .attr("fill", (d) => colorScale(d.key) as string);

  ageGroups
    .selectAll("rect")
    .data((d) => d)
    .join("rect")
    .attr("x", (d) => xScale(d.data.name as unknown as string) as number)
    .attr("y", (d) => yScale(d[1]))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d[0]) - yScale(d[1]));

  // Draw Axes
  const xAxis: d3.Axis<string> = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxis: d3.Axis<d3.NumberValue> = d3.axisLeft(yScale).ticks(null, "s");

  ctr.append("g").attr("transform", `translate(0, ${dimensions.ctrHeight})`).call(xAxis);

  ctr.append("g").attr("transform", `translate(${dimensions.margins}, 0)`).call(yAxis);
})();

//* ---------

interface DataSet2 {
  name: string;
  value: string;
}

(async function draw2(): Promise<void> {
  // Data
  const dataset = (await d3.csv("./src/data2.csv")) as DataSet2[];
  // console.log("dataset:", dataset);

  // Dimensions
  const dimensions = {
    width: 600,
    height: 600,
    margins: 10,
    ctrWidth: undefined as number | undefined,
    ctrHeight: undefined as number | undefined,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;
  const radius: number = dimensions.ctrWidth / 2;

  // Draw Image
  const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3
    .select("#chart2")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr: d3.Selection<SVGGElement, unknown, HTMLElement, any> = svg
    .append("g") // <g>
    .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);

  // Scales
  const populationPie: d3.Pie<any, number | { valueOf(): number }> = d3
    .pie()
    .value((d) => (d as unknown as DataSet2).value as unknown as number)
    .sort(null); //* Not to sort data!
  const slices: d3.PieArcDatum<number | { valueOf(): number }>[] = populationPie(dataset as unknown as number[]);

  const arc: d3.Arc<any, d3.DefaultArcObject> = d3.arc().outerRadius(radius).innerRadius(0);
  const arcLabels: d3.Arc<any, d3.DefaultArcObject> = d3.arc().outerRadius(radius).innerRadius(200);

  const colors: string[] = d3.quantize(d3.interpolateSpectral, dataset.length);
  // console.log("colors:", colors);
  const colorScale: d3.ScaleOrdinal<string, unknown, never> = d3
    .scaleOrdinal()
    .domain(dataset.map((element: DataSet2) => element.name))
    .range(colors);
  // console.log("colorScale:", colorScale);

  // Draw Shape
  const arcGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> = ctr
    .append("g")
    .attr("transform", `translate(${dimensions.ctrHeight / 2}, ${dimensions.ctrWidth / 2})`);

  arcGroup
    .selectAll("path")
    .data(slices)
    .join("path")
    .attr("d", arc as unknown as string)
    .attr("fill", (d) => colorScale((d.data as unknown as DataSet2).name) as string);

  const labelsGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> = ctr
    .append("g")
    .attr("transform", `translate(${dimensions.ctrHeight / 2}, ${dimensions.ctrWidth / 2})`)
    .classed("labels2", true);

  labelsGroup
    .selectAll("text")
    .data(slices)
    .join("text")
    .attr("transform", (d) => `translate(${arcLabels.centroid(d as unknown as d3.DefaultArcObject)})`)
    .call((text) => {
      // console.log("text:", text);
      text
        .append("tspan")
        .style("font-weight", "bold")
        .attr("y", -4)
        .text((d) => (d.data as unknown as DataSet2).name);
    })
    .call((text) => {
      // console.log("text:", text);
      text
        .filter((d) => d.endAngle - d.startAngle > 0.25) //* Value not shown for angle: d.endAngle - d.startAngle <=0.25 [radians]
        .append("tspan")
        .attr("y", 9)
        .attr("x", 0)
        .text((d) => (d.data as unknown as DataSet2).value);
    });
})();

//* ---------
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
