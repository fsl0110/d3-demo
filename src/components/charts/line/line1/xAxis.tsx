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
    const { xAxis, yAxis, margins, dimensions } = config;

    // create axis
    const x_axis = d3
      .axisBottom(scales.xScale)
      .scale(scales.xScale)
      .tickSize(xAxis.tickSize || 5)
      .tickPadding(xAxis.tickPadding || 5)
      .ticks(xAxis.ticks || 10) // TODO: compute default ticks from the height of the chart
      .tickFormat(xAxis.tickFormat || null);

    // define axis position
    let axisXTranslate = margins.left + margins.right;
    if (yAxis.label) {
      axisXTranslate = axisXTranslate + margins.bottom;
    }
    let axisYTranslate = dimensions.height - margins.top - margins.bottom;
    if (xAxis.label) {
      axisYTranslate = axisYTranslate - margins.bottom;
    }
    const textYTranslate = margins.bottom + margins.bottom;
    let textXTranslate = (dimensions.width - 40) / 2;
    let textAnchor = "end";

    if (xAxis.labelPosition) {
      switch (xAxis.labelPosition) {
        case "center":
          textXTranslate = (dimensions.width - 40) / 2;
          break;
        case "left":
          textXTranslate = 0;
          textAnchor = "start";
          break;
        case "right":
          textXTranslate = dimensions.width - margins.right * 4;
          break;
        default:
          return null;
      }
    }

    // add axis via call into a g element
    d3.select(el)
      .append("g")
      .attr("class", "chart__y-axis")
      .attr("transform", `translate(${axisXTranslate}, ${axisYTranslate})`)
      .call(x_axis)
      .append("text")
      .text(xAxis.label || "")
      .attr("class", "chart_y-label")
      .attr("fill", "black")
      .attr("text-anchor", `${textAnchor}`)
      .attr("transform", `translate(${textXTranslate}, ${textYTranslate})`)
      .style("fontSize", "13px");

    return el.toReact();
  };

  return <>{create(scales, config)}</>;
};
