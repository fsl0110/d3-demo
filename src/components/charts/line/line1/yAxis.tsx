import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import { LineChartConfig, Scales, Dimensions } from "./chart";

export interface Props {
  scales: Scales;
  dimensions: Dimensions;
  config: LineChartConfig;
}

export const YAxis: FC<Props> = ({ scales, config, dimensions }) => {
  const create = (
    scales: Scales,
    config: LineChartConfig,
    dimensions: Dimensions
  ) => {
    const el = ReactFauxDOM.createElement("g");
    const { yAxis } = config;

    // create axis
    const y_axis = d3
      .axisLeft(scales.yScale)
      .scale(scales.yScale)
      .tickSize(yAxis.tickSize || 5)
      .tickPadding(yAxis.tickPadding || 5)
      .ticks(yAxis.ticks || 8) // TODO: compute default ticks from the height of the chart
      .tickFormat(yAxis.tickFormat || null);

    // define axis position
    let axis_x_translate = dimensions.marginLeft + dimensions.marginRight;
    if (yAxis.label) {
      axis_x_translate = axis_x_translate + dimensions.marginBottom;
    }
    let axis_y_translate = dimensions.marginBottom;
    let text_x_translate = dimensions.marginLeft + dimensions.marginLeft;
    let text_y_translate = dimensions.height / 2;
    let text_anchor = "start";

    if (yAxis.labelPosition) {
      switch (yAxis.labelPosition) {
        case "center":
          text_y_translate = dimensions.height / 2;
          break;
        case "top":
          text_y_translate = 0;
          text_anchor = "end";
          break;
        case "bottom":
          text_y_translate = dimensions.height - dimensions.marginBottom * 4; // TODO: *2.5 does not make sense
          break;
        default:
          return null;
      }
    }

    // add axis via call into a g element
    d3.select(el)
      .append("g")
      .attr("class", "chart__y-axis")
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

  return <>{create(scales, config, dimensions)}</>;
};
