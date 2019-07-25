import { ChartDefaultConfig } from "./chart.types";

export const chartDefaultConfig: ChartDefaultConfig = {
  className: "chart",
  dimensions: {
    width: 500,
    height: 400
  },
  flex: true,
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
      count: 10,
      size: 5,
      padding: 5
    }
  },
  yAxis: {
    className: "chart__y-axis",
    label: {
      text: "Amount of Reports"
    },
    ticks: {
      count: 8,
      size: 5,
      padding: 5
    }
  }
};
