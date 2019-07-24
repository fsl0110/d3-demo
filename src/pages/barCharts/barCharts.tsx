import React, { PureComponent, createRef } from "react";
import Axios, { AxiosResponse } from "axios";
import Skeleton from "react-loading-skeleton";
import { Bar1 } from "../../components";

export interface State {
  data: { term: string; count: number }[];
  width: number;
  height: number;
}

export class BarCharts extends PureComponent<{}, State> {
  private ref: any = createRef<HTMLDivElement>();
  readonly state: State = {
    data: [],
    width: 300,
    height: 150
  };

  componentDidMount() {
    const dimensions = this.ref.current.getBoundingClientRect();
    if (dimensions.width !== this.state.width) {
      this.updateDimensions();
    }

    window.addEventListener("resize", this.updateDimensions);

    Axios.get(
      `https://api.fda.gov/food/enforcement.json?count=voluntary_mandated.exact`
    ).then((res: AxiosResponse) => {
      this.setState({ data: res.data.results });
    });
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
      <div className="barchart" ref={this.ref}>
        {data ? (
          <Bar1 data={data} width={width} height={height} />
        ) : (
          <Skeleton width={width} height={height} />
        )}
      </div>
    );
  }
}
