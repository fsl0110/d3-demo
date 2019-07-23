import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";

export const createChart = (
  data: { artist: string; color: string; startDate: Date; endDate: Date }[],
  width: number,
  height: number,
  animate?: any
) => {
  const el = ReactFauxDOM.createElement("svg");
  const x = d3
    .scaleTime()
    .range([0, 500])
    .domain([new Date(1670, 0, 1), new Date(1920, 0, 1)]);

  const xAxisGenerator = d3.axisBottom(x).scale(x);

  const svg = d3.select(el).append("g");
  /*   .attr("transform", "translate(50,0)"); */

  svg
    .append("g")
    .attr("class", "x-axis")
    .call(xAxisGenerator)
    .attr("transform", "translate(0,100)");

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.startDate))
    .attr("y", (d, i) => (i + 1) * 25)
    .attr("width", (d: any, i) => x(d.endDate) - x(d.startDate))
    .attr("height", "20")
    .style("fill", (d: any, i: number) => d.color)
    .on("mouseover", function(d: any) {
      const element = d3.select(this);
      console.log("element", element);
      svg
        .append("text")
        .attr("x", element.attr("x"))
        .attr("y", parseInt(element.attr("y")) + 15)
        .attr("id", "tooltip")
        .text(d.artist);
    })
    .on("mouseout", function() {
      d3.select("tooltip").remove();
    });

  return el.toReact();
};
