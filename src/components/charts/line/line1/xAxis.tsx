import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import { LineChartConfig, Scales } from "./chart";

export interface Props {
  scales: Scales;
  config: LineChartConfig;
}

export const XAxis: FC<Props> = ({ scales, config }) => {
  const create = (scales: Scales, config: LineChartConfig) => {
    const el = ReactFauxDOM.createElement("g");
    const { svgDimensions, margins, xAxis, yAxis } = config;

    // create axis
    const x_axis = d3.axisBottom(scales.x_scale).scale(scales.x_scale);

    // define axis position
    let axis_x_translate = margins.left + margins.right;
    if (yAxis.label) {
      axis_x_translate = axis_x_translate + margins.bottom;
    }

    let axis_y_translate = svgDimensions.height - margins.top - margins.bottom;
    if (xAxis.label) {
      axis_y_translate = axis_y_translate - margins.bottom;
    }

    const text_y_translate = margins.bottom + margins.bottom;
    let text_x_translate = (svgDimensions.width - 40) / 2;
    let text_anchor = "end";

    if (xAxis.labelPosition) {
      switch (xAxis.labelPosition) {
        case "center":
          text_x_translate = (svgDimensions.width - 40) / 2;
          break;
        case "left":
          text_x_translate = 0;
          text_anchor = "start";
          break;
        case "right":
          text_x_translate = svgDimensions.width - margins.right * 4;
          break;
        default:
          return null;
      }
    }

    // add axis via call into a g element
    d3.select(el)
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${axis_x_translate}, ${axis_y_translate})`)
      .call(x_axis)
      .append("text")
      .text(xAxis.label || "")
      .attr("class", "chart_y-label")
      .attr("fill", "black")
      .attr("text-anchor", `${text_anchor}`)
      .attr("transform", `translate(${text_x_translate}, ${text_y_translate})`)
      .style("fontSize", "13px");

    return el.toReact();
  };

  return <>{create(scales, config)}</>;
};
