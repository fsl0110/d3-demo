import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";

export interface Props {
  scales: any;
  config: any;
}

export const XAxis: FC<Props> = ({ scales, config }) => {
  const create = (scales: any, config: any) => {
    const el = ReactFauxDOM.createElement("g");

    // create axis
    const x_axis = d3.axisBottom(scales.x_scale).scale(scales.x_scale);

    // define axis position
    const { svgDimensions, margins } = config;
    const x_translate = margins.left + margins.right;
    const y_translate = svgDimensions.height - margins.top - margins.bottom;

    // append axis via call into a g element
    d3.select(el)
      .append("g")
      .attr("transform", `translate(${x_translate}, ${y_translate})`)
      .call(x_axis);

    return el.toReact();
  };

  return <>{create(scales, config)}</>;
};
