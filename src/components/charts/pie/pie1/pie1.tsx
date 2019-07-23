import React, { PureComponent } from "react";
import { createChart } from "./pie1Create";

export interface Props {
  data?: { color: string; rating: string }[];
  width?: number;
  height?: number;
}

export interface State {
  data: { color: string; rating: string }[];
  width: number;
  height: number;
}

export class Pie1 extends PureComponent<Props, State> {
  readonly state: State = {
    data: [],
    width: 0,
    height: 0
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (prevState.data !== nextProps.data) {
      return {
        data: nextProps.data
      };
    }
    return null;
  }

  render() {
    const { data, width, height } = this.state;
    return <>{createChart(data, width, height)}</>;
  }
}
