import React, { PureComponent } from "react";
import ReactFauxDOM from "react-faux-dom";
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
  private el: any;
  readonly state: State = {
    data: [],
    width: 600,
    height: 300
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    console.log("getDerivedStateFromProps", nextProps);
    if (prevState.data !== nextProps.data) {
      return {
        data: nextProps.data
      };
    }
    return null;
  }

  /*   componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    const dimensions: DOMRect = this.el.getBoundingClientRect();
    if (dimensions.width !== this.state.width) {
      this.updateDimensions();
    }
  } */
  /* 
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    const dimensions: DOMRect = this.el.getBoundingClientRect();
    console.log(dimensions);
    this.setState({
      width: dimensions.width,
      height: dimensions.height
    });
  }; */

  render() {
    const { data, width, height } = this.state;
    console.log("state width:", width);
    console.log("state data:", data);

    this.el = ReactFauxDOM.createElement("svg");
    return <>{createChart(data, width, height)}</>;
  }
}
