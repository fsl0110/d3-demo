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
  yScale: ScaleLinear<number, number>;
  xScale: ScaleTime<number, number>;
}

export interface Dimensions {
  height: number;
  width: number;
  marginTop: number;
  marginLeft: number;
  marginBottom: number;
  marginRight: number;
}

export interface LineChartConfig {
  className?: string;
  dimensions: Dimensions;
  xAxis: {
    className?: string;
    label?: string;
    labelPosition?: "left" | "center" | "right";
    ticks?: number;
    tickSize?: number;
    tickPadding?: number;
    tickFormat?: any;
  };
  yAxis: {
    className?: string;
    label?: string;
    labelPosition?: "top" | "center" | "bottom";
    ticks?: number;
    tickSize?: number;
    tickPadding?: number;
    tickFormat?: any;
  };
  line?: {
    color?: string;
    // http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8
    type?: "line" | "curve" | "step"; // line = d3.curvelinear, spline = d3.curveMonotoneX, step ? d3.curveStep
    width?: string;
    dashStyle?: "dashed" | "dotted";
  };
}

export interface Props {
  data: [number, number][];
  dimensions: Dimensions;
  config: LineChartConfig;
}

export interface State {
  data: [number, number][];
  dimensions: Dimensions;
  config: LineChartConfig;
}

export class Line1 extends PureComponent<Props, State> {
  readonly state: State = {
    data: [],
    dimensions: this.props.dimensions,
    config: this.props.config
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (prevState.data !== nextProps.data) {
      return produce(prevState, (draft: State) => {
        draft.data = nextProps.data;
      });
    }

    if (prevState.dimensions !== nextProps.dimensions) {
      return produce(prevState, (draft: State) => {
        draft.dimensions = nextProps.dimensions;
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
    const { data, dimensions, config } = this.state;
    const { xAxis, yAxis, className } = config;
    /** Merge new width and height after viewport resize here */
    const width =
      dimensions.width - dimensions.marginLeft - dimensions.marginRight;
    const height =
      dimensions.height - dimensions.marginTop - dimensions.marginBottom;
    const xScaleMinValue = Math.min(...data.map((d: any) => d[0]));
    const xScaleMaxValue = Math.max(...data.map((d: any) => d[0]));
    const yScaleMaxValue = Math.max(...data.map((d: any) => d[1]));
    let yRange = height - dimensions.marginBottom;
    if (xAxis.label) {
      yRange = yRange - dimensions.marginLeft;
    }
    let xRange = width - dimensions.marginRight;
    if (yAxis.label) {
      xRange = xRange - dimensions.marginLeft;
    }

    const xScale = d3
      .scaleTime()
      .domain([xScaleMinValue, xScaleMaxValue])
      .range([0, xRange]);

    const yScale = d3
      .scaleLinear()
      .domain([0, yScaleMaxValue])
      .range([yRange, 0]);

    const scales = { xScale, yScale };
    console.log("resize width", width);
    return (
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className={classNames("chart", className)}
      >
        <g className="chart__container">
          <XAxis scales={scales} config={config} dimensions={dimensions} />
          <YAxis scales={scales} config={config} dimensions={dimensions} />
          <Line
            data={data}
            scales={scales}
            config={config}
            dimensions={dimensions}
          />
        </g>
      </svg>
    );
  }
}
