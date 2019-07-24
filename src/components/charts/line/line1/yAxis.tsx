import React, { FC } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
export interface Props {
  scales: any;
  config: any;
}

export const YAxis: FC<Props> = ({ scales, config }) => {
  const create = (scales: any, config: any) => {
    const el = ReactFauxDOM.createElement("g");

    // create axis
    const y_axis = d3.axisLeft(scales.y_scale).scale(scales.y_scale);

    // define axis position
    const { margins } = config;
    const x_translate = margins.left + margins.right;
    const y_translate = margins.top;

    // append axis via call into a g element
    d3.select(el)
      .append("g")
      .attr("transform", `translate(${x_translate}, ${y_translate})`)
      .call(y_axis);

    return el.toReact();
  };

  return <>{create(scales, config)}</>;
};
