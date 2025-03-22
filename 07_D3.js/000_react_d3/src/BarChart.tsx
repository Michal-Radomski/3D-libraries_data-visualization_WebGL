// src/components/BarChart.tsx
import React from "react";
import * as d3 from "d3";

import { useD3 } from "./useD3";

interface BarChartProps {
  data: { year: string; value: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }): React.JSX.Element => {
  const ref = useD3(
    (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
      const height = 500;
      const width = 500;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x: d3.ScaleBand<string> = d3
        .scaleBand()
        .domain(data.map((d) => d.year))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y: d3.ScaleLinear<number, number, never> = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value) || 0])
        .nice()
        .range([height - margin.bottom, margin.top]);

      svg.selectAll("*").remove(); // Clear previous renders

      svg
        .append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.year)!)
        .attr("y", (d) => y(d.value))
        .attr("height", (d) => y(0) - y(d.value))
        .attr("width", x.bandwidth());

      svg.append("g").call(d3.axisLeft(y).ticks(null, "s")).attr("transform", `translate(${margin.left},0)`);

      svg
        .append("g")
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0,${height - margin.bottom})`);
    },
    [data]
  );

  return <svg ref={ref} style={{ height: 500, width: "100%" }} />;
};

export default BarChart;
