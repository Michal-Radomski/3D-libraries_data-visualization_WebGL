//* Examples: https://pudding.cool/2017/05/song-repetition

import * as d3 from "d3";
// console.log("d3:", d3);

import "./style.scss";

// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x: d3.ScaleTime<number, number, never> = d3
  .scaleUtc()
  .domain([new Date("2023-01-01"), new Date("2024-01-01")])
  .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y: d3.ScaleLinear<number, number, never> = d3
  .scaleLinear()
  .domain([0, 100])
  .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg: d3.Selection<SVGSVGElement, undefined, null, undefined> = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height);

// Add the x-axis.
svg
  .append("g")
  .attr("transform", `translate(0,${height - marginBottom})`)
  .call(d3.axisBottom(x));

// Add the y-axis.
svg.append("g").attr("transform", `translate(${marginLeft},0)`).call(d3.axisLeft(y));

// Append the SVG element.
const container = document.querySelector("div#container") as HTMLDivElement;
container.append(svg.node() as SVGSVGElement);

const elem: d3.Selection<HTMLParagraphElement, unknown, HTMLElement, any> = d3
  .select("body")
  .append("p") //* Transformation method!
  .attr("class", "foo")
  // .attr('class', 'bar')
  // .classed("foo", true)
  .classed("bar", true)
  .text("Hello World")
  // .style("color", "blue")
  .style("text-decoration", "overline #ff3028");

console.log("elem:", elem);

const p: d3.Selection<d3.BaseType, unknown, HTMLElement, any> = d3.selectAll("p");
console.log("p:", p);

{
  const data = [10, 20, 30, 40, 50];
  const el: d3.Selection<d3.BaseType, number, d3.BaseType, unknown> = d3
    .select("ul")
    .selectAll("li")
    .data(data)
    .join(
      (enter: d3.Selection<d3.EnterElement, number, d3.BaseType, unknown>) => {
        return enter.append("li").style("color", "purple");
      },
      (update: d3.Selection<d3.BaseType, number, d3.BaseType, unknown>) => update.style("color", "green"),
      (exit: d3.Selection<d3.BaseType, number, d3.BaseType, unknown>) => exit.remove()
    )
    .text((d: number) => d);

  el.enter()
    .append("li")
    .text((d: number) => d);

  el.exit().remove();
}

//* Data in D3.js
(async function getData(): Promise<void> {
  const data_1 = await d3.json("./src/data/data.json");
  const data_2 = await d3.csv("./src/data/data.csv");

  console.log("data_1, data_2:", data_1, data_2);
})();
