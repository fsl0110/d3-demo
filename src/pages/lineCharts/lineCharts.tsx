import React, { PureComponent, createRef } from "react";
import { AxiosResponse, AxiosError } from "axios";
import Skeleton from "react-loading-skeleton";
import { axiosOpenFDA, openFDA } from "../../utils/api/openFDA";
import { Line1 } from "../../components";
import { ChartDefaultConfig } from "../../components/charts/line/line1/chart.types";
export type Data = [number, number][];

const config = {
  className: "chart",
  dimensions: {
    width: 500,
    height: 300
  },
  flex: false,
  margins: {
    top: 20,
    left: 20,
    bottom: 20,
    right: 20
  },
  xAxis: {
    className: "chart__x-axis",
    label: {
      text: "Time since 2012"
    },
    ticks: {
      count: 5,
      size: 5,
      padding: 0
    }
  },
  yAxis: {
    className: "chart__y-axis",
    label: {
      text: "Amount of Reports"
    },
    ticks: {
      count: 5,
      size: 5,
      padding: 0
    }
  }
};

export interface State {
  data: [number, number][];
  config: ChartDefaultConfig;
}

export class LineCharts extends PureComponent<{}, State> {
  private ref: any = createRef<HTMLDivElement>();
  readonly state: State = {
    data: [],
    config
  };

  componentDidMount() {
    axiosOpenFDA(openFDA.foodEnforcementReports(""))
      .then((res: AxiosResponse) => {
        this.setState({
          data: res.data
        });
      })
      .catch((err: AxiosError) => null);
  }

  render() {
    const { data, config } = this.state;

    return (
      <div className="linechart" ref={this.ref}>
        {data ? (
          <Line1 data={data} config={config} />
        ) : (
          <Skeleton
            width={config.dimensions.width}
            height={config.dimensions.height}
          />
        )}
      </div>
    );
  }
}
