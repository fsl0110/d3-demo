import React, { PureComponent } from "react";
import { createChart } from "./bar2Create";

export interface Props {
  data: { artist: string; color: string; startDate: Date; endDate: Date }[];
  width: number;
  height: number;
}

export interface State {
  data: { artist: string; color: string; startDate: Date; endDate: Date }[];
  width: number;
  height: number;
}

export class Bar2 extends PureComponent<Props, State> {
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
