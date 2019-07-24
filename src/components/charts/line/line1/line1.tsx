import React, { PureComponent } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import classNames from "classnames";
import { XAxis } from "./xAxis";
import { YAxis } from "./yAxis";

export interface Props {
  data: any;
  config: any;
}

export interface State {
  data: any;
  config: {
    className: string;
    svgDimensions: {
      height: number;
      width: number;
    };
    margins: {
      top: number;
      left: number;
      bottom: number;
      right: number;
    };
    xAxis: {
      className: string;
    };
    yAxis: {
      className: string;
    };
  };
}

export class Line1 extends PureComponent<Props, State> {
  readonly state: State = {
    data: [],
    config: {
      className: "line1",
      svgDimensions: {
        width: 600,
        height: 300
      },
      margins: {
        top: 20,
        left: 20,
        bottom: 20,
        right: 20
      },
      xAxis: {
        className: "x-axis"
      },
      yAxis: {
        className: "y-axis"
      }
    }
  };

  render() {
    const { svgDimensions, margins, className } = this.state.config;
    /** Merge new width and height after viewport resize here */
    const width = svgDimensions.width - margins.left - margins.right;
    const height = svgDimensions.height - margins.top - margins.bottom;

    const x_scale = d3
      .scaleTime()
      .domain([new Date(2016, 0, 1), new Date(2017, 0, 1)])
      .range([0, width - margins.right]);

    const y_scale = d3
      .scaleLinear()
      .domain([0, 200])
      .range([height - margins.bottom, 0]);

    const scales = { x_scale, y_scale };

    return (
      <svg
        width={svgDimensions.width}
        height={svgDimensions.height}
        className={classNames("chart", className)}
      >
        <g className="chart__container">
          <XAxis scales={scales} config={this.state.config} />
          <YAxis scales={scales} config={this.state.config} />
        </g>
      </svg>
    );
  }
}
