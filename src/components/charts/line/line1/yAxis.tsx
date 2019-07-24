import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import { LineChartConfig, Scales } from "./chart";
import { labeledStatement } from "@babel/types";

export interface Props {
  scales: Scales;
  config: LineChartConfig;
}

export const YAxis: FC<Props> = ({ scales, config }) => {
  const create = (scales: Scales, config: LineChartConfig) => {
    const el = ReactFauxDOM.createElement("g");

    // create axis
    const y_axis = d3.axisLeft(scales.y_scale).scale(scales.y_scale);

    // define axis position
    const { margins, svgDimensions, yAxis } = config;

    // 1. if label than translate y - margin-top
    // 2. if label than translate x
    console.log("1");

    let axis_x_translate = margins.left + margins.right;
    if (yAxis.label) {
      axis_x_translate = axis_x_translate + margins.bottom;
    }

    let axis_y_translate = margins.bottom;

    let text_x_translate = margins.left + margins.left;
    let text_y_translate = svgDimensions.height / 2;
    let text_anchor = "start";

    if (yAxis.labelPosition) {
      switch (yAxis.labelPosition) {
        case "center":
          text_y_translate = svgDimensions.height / 2;
          break;
        case "top":
          text_y_translate = 0;
          text_anchor = "end";
          break;
        case "bottom":
          text_y_translate = svgDimensions.height - margins.bottom * 4; // TODO: *2.5 does not make sense
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
      .call(y_axis)
      .append("g")
      .append("text")
      .text(yAxis.label || "")
      .attr("class", "chart_y-label")
      .attr("fill", "black")
      .attr("text-anchor", `${text_anchor}`)
      .style("fontSize", "13px")
      .attr(
        "transform",
        `translate(${-text_x_translate}, ${text_y_translate}) rotate(-90)`
      );

    return el.toReact();
  };

  return <>{create(scales, config)}</>;
};
