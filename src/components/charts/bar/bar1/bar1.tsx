import React, { PureComponent } from "react";
import { createChart } from "./bar1Create";

export interface Props {
  data: { term: string; count: number }[];
  width: number;
  height: number;
}

export interface State {
  data: { term: string; count: number }[];
  width: number;
  height: number;
}

export class Bar1 extends PureComponent<Props, State> {
  readonly state: State = {
    data: [],
    width: 350,
    height: 150
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
