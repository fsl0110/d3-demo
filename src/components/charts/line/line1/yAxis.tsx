import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import { ChartDefaultConfig, Scales } from "./chart.types";

export interface Props {
  scales: Scales;
  config: ChartDefaultConfig;
}

export const YAxis: FC<Props> = ({ scales, config }) => {
  const create = (scales: Scales, config: ChartDefaultConfig) => {
    const el = ReactFauxDOM.createElement("g");
    const { yAxis, margins, dimensions } = config;

    // define axis position
    let axisXTranslate = margins.left + margins.right;
    if (yAxis.label) {
      axisXTranslate = axisXTranslate + margins.bottom;
    }
    let axisYTranslate = margins.bottom;
    let textXTranslate = margins.left + margins.left;
    let textYTranslate = dimensions.height / 2;
    let textAnchor = "start";

    if (yAxis.label.position) {
      switch (yAxis.label.position) {
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

    // create axis
    const y_axis = d3
      .axisLeft(scales.yScale)
      .scale(scales.yScale)
      .tickSize(yAxis.ticks.size)
      .tickPadding(yAxis.ticks.padding)
      .ticks(yAxis.ticks.count)
      .tickFormat(yAxis.ticks.format);

    // add axis via call into a g element
    d3.select(el)
      .append("g")
      .attr("class", "chart__y-axis")
      .attr("transform", `translate(${axisXTranslate}, ${axisYTranslate})`)
      .call(y_axis)
      .append("g")
      .append("text")
      .text(yAxis.label.text)
      .attr("class", "chart_y-label")
      .attr("fill", "black")
      .attr("text-anchor", `${textAnchor}`)
      .style("fontSize", "13px")
      .attr(
        "transform",
        `translate(${-textXTranslate}, ${textYTranslate}) rotate(-90)`
      );

    // create grid
    const y_grid = d3
      .axisLeft(scales.yScale)
      .tickSizeInner(0)
      .tickSizeOuter(0)
      .tickSize(-dimensions.width + margins.right * 4)
      .ticks(5)
      .tickFormat(null);

    d3.select(el)
      .append("g")
      .attr("class", "chart__gridline")
      .attr("transform", `translate(${axisXTranslate}, ${axisYTranslate})`)
      .call(y_grid);

    return el.toReact();
  };

  return <>{create(scales, config)}</>;
};
