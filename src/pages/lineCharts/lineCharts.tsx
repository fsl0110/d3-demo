import React, { PureComponent, createRef } from "react";
import { AxiosResponse, AxiosError } from "axios";
import Skeleton from "react-loading-skeleton";
import produce from "immer";
import { axiosOpenFDA, openFDA } from "../../utils/api/openFDA";
import { Line1 } from "../../components";
import {
  LineChartConfig,
  Dimensions
} from "../../components/charts/line/line1/chart";
export type Data = [number, number][];

const config = {
  className: "line1",
  dimensions: {
    width: 1200,
    height: 300
  },
  margins: {
    top: 20,
    left: 20,
    bottom: 20,
    right: 20
  },
  xAxis: {
    className: "x-axis",
    label: "Time since 2012"
  },
  yAxis: {
    className: "y-axis",
    label: "Amount of Reports"
  }
};

export interface State {
  data: [number, number][];
  config: LineChartConfig;
}

export class LineCharts extends PureComponent<{}, State> {
  private ref: any = createRef<HTMLDivElement>();
  readonly state: State = {
    data: [],
    config
  };
  componentDidMount() {
    const term = "";
    axiosOpenFDA(openFDA.foodEnforcementReports(term))
      .then((res: AxiosResponse) => {
        this.setState({
          data: res.data
        });
      })
      .catch((err: AxiosError) => null);

    const dimensions = this.ref.current.getBoundingClientRect();
    const { width, height } = this.state.config.dimensions;
    if (dimensions.width !== width || dimensions.height !== height) {
      this.updateDimensions();
    }

    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    const dimensions = this.ref.current.getBoundingClientRect();
    console.log(dimensions);

    this.setState(
      produce((draft: any) => {
        draft.config.dimensions.width = dimensions.width;
        /*       draft.config.svgDimensions.height = dimensions.height; */
      })
    );
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
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
