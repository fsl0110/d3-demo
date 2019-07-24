import React, { PureComponent, createRef } from "react";
import { AxiosResponse, AxiosError } from "axios";
import Skeleton from "react-loading-skeleton";
import { axiosOpenFDA, openFDA } from "../../utils/api/openFDA";
import { Line1 } from "../../components";

const config = {
  className: "line1",
  svgDimensions: {
    width: 1200,
    height: 600
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
};

export interface State {
  data: { artist: string; color: string; startDate: Date; endDate: Date }[];
  width: number;
  height: number;
}

export class LineCharts extends PureComponent<{}, State> {
  private ref: any = createRef<HTMLDivElement>();
  readonly state: State = {
    data: [],
    width: 350,
    height: 150
  };

  componentDidMount() {
    const term = "";
    axiosOpenFDA(openFDA.foodEnforcementReports(term))
      .then((res: AxiosResponse) => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch((err: AxiosError) => null);

    const dimensions = this.ref.current.getBoundingClientRect();
    if (dimensions.width !== this.state.width) {
      this.updateDimensions();
    }

    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    const dimensions = this.ref.current.getBoundingClientRect();
    this.setState({
      width: dimensions.width,
      height: dimensions.height
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { data, width, height } = this.state;

    return (
      <div className="linechart" ref={this.ref}>
        {data ? (
          <Line1 data={data} config={config} />
        ) : (
          <Skeleton width={width} height={height} />
        )}
      </div>
    );
  }
}
