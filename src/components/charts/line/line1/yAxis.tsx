import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import { LineChartConfig, Scales } from "./chart";

export interface Props {
  scales: Scales;
  config: LineChartConfig;
}

export const YAxis: FC<Props> = ({ scales, config }) => {
  const create = (scales: Scales, config: LineChartConfig) => {
    const el = ReactFauxDOM.createElement("g");
    const { yAxis, margins, dimensions } = config;

    // create axis
    const y_axis = d3
      .axisLeft(scales.yScale)
      .scale(scales.yScale)
      .tickSize(yAxis.tickSize || 5)
      .tickPadding(yAxis.tickPadding || 5)
      .ticks(yAxis.ticks || 8) // TODO: compute default ticks from the height of the chart
      .tickFormat(yAxis.tickFormat || null);

    // define axis position
    let axisXTranslate = margins.left + margins.right;
    if (yAxis.label) {
      axisXTranslate = axisXTranslate + margins.bottom;
    }
    let axisYTranslate = margins.bottom;
    let textXTranslate = margins.left + margins.left;
    let textYTranslate = dimensions.height / 2;
    let textAnchor = "start";

    if (yAxis.labelPosition) {
      switch (yAxis.labelPosition) {
        case "center":
          textYTranslate = dimensions.height / 2;
          break;
        case "top":
          textYTranslate = 0;
          textAnchor = "end";
          break;
        case "bottom":
          textYTranslate = dimensions.height - margins.bottom * 4; // TODO: *2.5 does not make sense
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
      .call(y_axis)
      .append("g")
      .append("text")
      .text(yAxis.label || "")
      .attr("class", "chart_y-label")
      .attr("fill", "black")
      .attr("text-anchor", `${textAnchor}`)
      .style("fontSize", "13px")
      .attr(
        "transform",
        `translate(${-textXTranslate}, ${textYTranslate}) rotate(-90)`
      );

    return el.toReact();
  };

  return <>{create(scales, config)}</>;
};
