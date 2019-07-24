import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";

export interface Props {
  scales: any;
  data: any;
}
export const Line: FC<Props> = ({ data, scales }) => {
  const createChart = (data: any, scales: any) => {
    const el = ReactFauxDOM.createElement("path");

    // generate line
    const lineGenerator = d3
      .line()
      .x((d: any) => scales.x_scale(d[0]))
      .y((d: any) => scales.y_scale(d[1]))
      .curve(d3.curveMonotoneX);

    // append line to d attribute of path element
    d3.select(el)
      .attr("class", "line-path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "aqua")
      .attr("d", lineGenerator)
      .attr("transform", `translate(${42}, ${20})`);

    return el.toReact();
  };

  return <>{createChart(data, scales)}</>;
};
