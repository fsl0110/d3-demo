import React, { PureComponent, createRef } from "react";
import produce from "immer";

import * as d3 from "d3";
import classNames from "classnames";
import { ChartDefaultConfig } from "./chart.types";
import { chartDefaultConfig } from "./chart.config";
import { XAxis } from "./xAxis";
import { YAxis } from "./yAxis";
import { Line } from "./line";

export interface Props {
  data: [number, number][];
  config: ChartDefaultConfig;
}

export interface State {
  data: [number, number][];
  config: ChartDefaultConfig;
}

export class Line1 extends PureComponent<Props, State> {
  private ref: any = createRef<HTMLDivElement>();
  readonly state: State = {
    data: [],
    config: chartDefaultConfig
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (prevState.data !== nextProps.data) {
      return produce(prevState, (draft: State) => {
        draft.data = nextProps.data;
      });
    }
    return null;
  }

  componentDidMount() {
    if (this.state.config.flex) {
      window.addEventListener("resize", this.updateDimensions);
      const dimensions = this.ref.current.getBoundingClientRect();
      const { width, height } = this.state.config.dimensions;
      if (dimensions.width !== width || dimensions.height !== height) {
        this.updateDimensions();
      }
    }
  }

  updateDimensions = () => {
    const dimensions: ClientRect = this.ref.current.getBoundingClientRect();
    this.setState(
      produce(this.state, (draft: State) => {
        draft.config.dimensions.width = dimensions.width;
        draft.config.xAxis.ticks.count = dimensions.width / 75;
      })
    );
  };

  render() {
    const { data, config } = this.state;
    const { xAxis, yAxis, className, dimensions, margins } = config;

    const width = dimensions.width - margins.left - margins.right;
    const height = dimensions.height - margins.top - margins.bottom;
    const xScaleMinValue = Math.min(...data.map((d: any) => d[0]));
    const xScaleMaxValue = Math.max(...data.map((d: any) => d[0]));
    const yScaleMaxValue = Math.max(...data.map((d: any) => d[1]));
    let yRange = height - margins.bottom;
    if (xAxis.label) {
      yRange = yRange - margins.left;
    }
    let xRange = width - margins.right;
    if (yAxis.label) {
      xRange = xRange - margins.left;
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

    return (
      <div className={classNames("chart", className)} ref={this.ref}>
        <svg width={dimensions.width} height={dimensions.height}>
          <g className="chart__container">
            <XAxis scales={scales} config={config} />
            <YAxis scales={scales} config={config} />
            <Line scales={scales} config={config} data={data} />
          </g>
        </svg>
      </div>
    );
  }
}
