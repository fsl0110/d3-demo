import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import { LineChartConfig, Data, Scales } from "./chart";

export interface Props {
  scales: Scales;
  data: Data;
  config: LineChartConfig;
}
export const Line: FC<Props> = ({ data, scales, config }) => {
  const createChart = (scales: Scales, data: Data, config: LineChartConfig) => {
    const el = ReactFauxDOM.createElement("path");

    // generate line
    const lineGenerator = d3
      .line()
      .x((d: any) => scales.xScale(d[0]))
      .y((d: any) => scales.yScale(d[1]))
      .curve(d3.curveMonotoneX);

    // define line position
    const { yAxis, margins } = config;

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
