import React, { PureComponent } from "react";
import produce from "immer";
import { ScaleLinear, ScaleTime } from "d3-scale";
import * as d3 from "d3";
import classNames from "classnames";
import { XAxis } from "./xAxis";
import { YAxis } from "./yAxis";
import { Line } from "./line";

export type Data = [number, number][];

export interface Scales {
  y_scale: ScaleLinear<number, number>;
  x_scale: ScaleTime<number, number>;
}

export interface LineChartConfig {
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
    className?: string;
    label?: string;
    labelPosition?: "left" | "center" | "right";
    ticks?: number;
    tickSize?: number;
  };
  yAxis: {
    className?: string;
    label?: string;
    labelPosition?: "top" | "center" | "bottom";
    ticks?: number;
    tickSize?: number;
  };
}
export interface Props {
  data: any;
  config: any;
}

export interface State {
  data: any;
  config: LineChartConfig;
}

export class Line1 extends PureComponent<Props, State> {
  readonly state: State = {
    data: [],
    config: {
      className: "",
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
      xAxis: {},
      yAxis: {}
    }
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (prevState.data !== nextProps.data) {
      return produce(prevState, (draft: State) => {
        draft.data = nextProps.data;
      });
    }

    if (prevState.config !== nextProps.config) {
      return produce(prevState, (draft: State) => {
        draft.config = nextProps.config;
      });
    }
    return null;
  }

  render() {
    const { data, config } = this.state;
    const { svgDimensions, margins, xAxis, yAxis, className } = config;
    /** Merge new width and height after viewport resize here */
    const width = svgDimensions.width - margins.left - margins.right;
    const height = svgDimensions.height - margins.top - margins.bottom;
    const xScaleMinValue = Math.min(...data.map((d: any) => d[0]));
    const xScaleMaxValue = Math.max(...data.map((d: any) => d[0]));
    const yScaleMaxValue = Math.max(...data.map((d: any) => d[1]));
    let y_range = height - margins.bottom;
    if (xAxis.label) {
      y_range = y_range - margins.left;
    }
    let x_range = width - margins.right;
    if (yAxis.label) {
      x_range = x_range - margins.left;
    }

    const x_scale = d3
      .scaleTime()
      .domain([xScaleMinValue, xScaleMaxValue])
      .range([0, x_range]);

    const y_scale = d3
      .scaleLinear()
      .domain([0, yScaleMaxValue])
      .range([y_range, 0]);

    const scales = { x_scale, y_scale };

    return (
      <svg
        width={svgDimensions.width}
        height={svgDimensions.height}
        className={classNames("chart", className)}
      >
        <g className="chart__container">
          <XAxis scales={scales} config={config} />
          <YAxis scales={scales} config={config} />
          <Line data={data} scales={scales} config={config} />
        </g>
      </svg>
    );
  }
}
