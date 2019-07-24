import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";

export const createChart = (
  data: { color: string; rating: string }[],
  width: number,
  height: number,
  animate?: any
) => {
  const el = ReactFauxDOM.createElement("svg");
  /* 
  const mockData = [
    {
      time: "1980-01-01",
      population: 10
    },
    {
      time: "1990-01-01",
      population: 20
    },
    {
      time: "2000-01-01",
      population: 30
    }
  ];

  const x = d3
    .pie()
    .sort(null)
    .value((d: any) => d.population);

  const path = d3
    .arc()
    .outerRadius(150)
    .innerRadius(0);

  const svg = d3
    .select(el)
    .append("g")
    .attr("transform", "translate(50,0)");
  const arc = svg
    .selectAll(".arc")
    //@ts-ignore
    .data(pie(mockData))
    .enter()
    .append("g")
    .attr("class", "arc");
  //@ts-ignore
  arc.append("path").attr("d", path);
 */
  return el.toReact();
};
