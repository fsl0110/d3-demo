import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";

export const createChart = (
  data: any,

  width: number,
  height: number,
  animate?: any
) => {
  const el = ReactFauxDOM.createElement("svg");
  const data2 = [
    {
      y: "red",
      x: 10
    },
    {
      y: "blue",
      x: 20
    },
    {
      y: "green",
      x: 30
    }
  ];

  const x = d3
    .scaleLinear()
    .range([0, 500])
    .domain([0, 40]);

  const xAxisGenerator = d3.axisBottom(x).scale(x);

  const svg = d3
    .select(el)
    .append("g")
    .attr("transform", "translate(50,0)");

  svg
    .append("g")
    .call(xAxisGenerator)
    .attr("transform", "translate(0,100)");

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", (d, i) => (i + 1) * 25)
    .attr("width", (d: any, i) => x(d.count / 400))
    .attr("height", "20")
    .style("fill", "aqua");

  return el.toReact();
};
