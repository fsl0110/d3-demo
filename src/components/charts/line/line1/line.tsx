import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";

export interface Props {
  scales: any;
  data: any;
  config: any;
}
export const Line: FC<Props> = ({ data, scales, config }) => {
  const createChart = (scales: any, data: any, config: any) => {
    const el = ReactFauxDOM.createElement("path");

    // generate line
    const lineGenerator = d3
      .line()
      .x((d: any) => scales.x_scale(d[0]))
      .y((d: any) => scales.y_scale(d[1]))
      .curve(d3.curveMonotoneX);

    // define line position
    const { margins, yAxis } = config;

    let x_translate = margins.left + margins.right + 2; // add two against overlapping

    if (yAxis.label) {
      x_translate = margins.left + margins.right + margins.right + 2; // add two against overlapping
    }

    const y_translate = margins.top;

    // add line to the d attribute of the path element
    d3.select(el)
      .attr("class", "line-path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "aqua")
      .attr("d", lineGenerator)
      .attr("transform", `translate(${x_translate}, ${y_translate})`);

    return el.toReact();
  };

  return <>{createChart(scales, data, config)}</>;
};
