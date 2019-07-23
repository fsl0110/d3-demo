import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";

export const createChart = (
  data: { color: string; rating: string }[],
  width: number,
  height: number,
  animate?: any
) => {
  const el = ReactFauxDOM.createElement("svg");

  const ratingFactors = ["desaster", "bad", "ok", "good", "perfect"];
  const mockData: any = [
    { color: "red", rating: "bad" },
    { color: "yellow", rating: "ok" },
    { color: "green", rating: "good" }
  ];

  const x = d3
    .scaleOrdinal()
    .range([0, 100, 200, 300, 400, 500])
    .domain(ratingFactors);
  //@ts-ignore
  const xAxisGenerator = d3.axisBottom(x).scale(x);

  const svg = d3
    .select(el)
    .append("g")
    .attr("transform", "translate(40,0)");

  svg
    .append("g")
    .attr("class", "x-axis")
    .call(xAxisGenerator)
    .attr("transform", "translate(0,80)");

  svg
    .selectAll("circle")
    .data(mockData)
    .enter()
    .append("circle")
    // @ts-ignore
    .attr("cx", (d: any) => x(d.rating))
    .attr("cy", "60")
    .attr("r", 10)
    .style("fill", (d: any) => d.color);

  return el.toReact();
};
