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

const dimensions: Dimensions = {
  width: 1200,
  height: 300,
  marginTop: 20,
  marginLeft: 20,
  marginBottom: 20,
  marginRight: 20
};

const config = {
  className: "line1",
  dimensions: {
    width: 1200,
    height: 300,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    marginRight: 20
  },
  xAxis: {
    className: "x-axis",
    label: "Days since 2012"
  },
  yAxis: {
    className: "y-axis",
    label: "Amount of Reports"
  }
};

export interface State {
  data: [number, number][];
  dimensions: Dimensions;
  config: LineChartConfig;
}

export class LineCharts extends PureComponent<{}, State> {
  private ref: any = createRef<HTMLDivElement>();
  state: State = {
    data: [],
    dimensions,
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
    const { width, height } = this.state.dimensions;
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
        draft.dimensions.width = dimensions.width;
        /*       draft.config.svgDimensions.height = dimensions.height; */
      })
    );
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { data, config } = this.state;
    console.log("width", this.state.dimensions.width);
    return (
      <div className="linechart" ref={this.ref}>
        {data ? (
          <Line1 data={data} config={config} dimensions={dimensions} />
        ) : (
          <Skeleton width={dimensions.width} height={dimensions.height} />
        )}
      </div>
    );
  }
}
