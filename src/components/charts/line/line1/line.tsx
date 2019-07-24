import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import moment from "moment";

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
      .x((d: any) => scales.x_scale(d.time))
      .y((d: any) => scales.y_scale(d.count))
      .curve(d3.curveMonotoneX);

    // append line to d attribute of path element
    d3.select(el)
      .attr("class", "line-path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "grey")
      .attr("stroke-width", "3px")
      .attr("d", lineGenerator);

    return el.toReact();
  };

  return <>{createChart(data, scales)}</>;
};
