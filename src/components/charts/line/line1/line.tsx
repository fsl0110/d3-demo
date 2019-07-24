import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import { LineChartConfig, Data, Scales, Dimensions } from "./chart";

export interface Props {
  scales: Scales;
  data: Data;
  config: LineChartConfig;
  dimensions: Dimensions;
}
export const Line: FC<Props> = ({ data, scales, config, dimensions }) => {
  const createChart = (
    scales: Scales,
    data: Data,
    config: LineChartConfig,
    dimensions: Dimensions
  ) => {
    const el = ReactFauxDOM.createElement("path");

    // generate line
    const lineGenerator = d3
      .line()
      .x((d: any) => scales.xScale(d[0]))
      .y((d: any) => scales.yScale(d[1]))
      .curve(d3.curveMonotoneX);

    // define line position
    const { yAxis } = config;

    let x_translate = dimensions.marginLeft + dimensions.marginRight + 2; // add two against overlapping

    if (yAxis.label) {
      x_translate =
        dimensions.marginLeft +
        dimensions.marginRight +
        dimensions.marginRight +
        2; // add two against overlapping
    }

    const y_translate = dimensions.marginTop;

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

  return <>{createChart(scales, data, config, dimensions)}</>;
};
