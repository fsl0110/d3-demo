import React, { PureComponent, createRef } from "react";
import Axios, { AxiosResponse } from "axios";
import Skeleton from "react-loading-skeleton";
import { Timeline1 } from "../../components";

export interface State {
  data: { artist: string; color: string; startDate: Date; endDate: Date }[];
  width: number;
  height: number;
}

export class TimelineCharts extends PureComponent<{}, State> {
  private ref: any = createRef<HTMLDivElement>();
  readonly state: State = {
    data: [],
    width: 350,
    height: 150
  };

  componentDidMount() {
    const dimensions = this.ref.current.getBoundingClientRect();
    if (dimensions.width !== this.state.width) {
      this.updateDimensions();
    }

    window.addEventListener("resize", this.updateDimensions);

    /*     Axios.get(
      `https://api.fda.gov/food/enforcement.json?count=voluntary_mandated.exact`
    ).then((res: AxiosResponse) => {
      this.setState({ data: res.data.results });
    }); */
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

    const mockData = [
      {
        artist: "W. A. Mozart",
        color: "pink",
        startDate: new Date(1756, 0, 27),
        endDate: new Date(1791, 11, 5)
      },
      {
        artist: "J. Haydn",
        color: "violet",
        startDate: new Date(1841, 8, 8),
        endDate: new Date(1904, 4, 1)
      },
      {
        artist: "A. Vivaldi",
        color: "red",
        startDate: new Date(1678, 2, 4),
        endDate: new Date(1741, 6, 28)
      }
    ];

    return (
      <div className="barchart" ref={this.ref}>
        {data ? (
          <Timeline1 data={mockData} width={width} height={height} />
        ) : (
          <Skeleton width={width} height={height} />
        )}
      </div>
    );
  }
}
