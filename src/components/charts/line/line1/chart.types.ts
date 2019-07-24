import { ScaleLinear, ScaleTime } from "d3-scale";

export interface ChartDefaultConfig {
  className?: string;
  dimensions: Dimensions;
  margins: Margins;
  flex?: boolean;
  xAxis: {
    className?: string;
    label: {
      text: string;
      position?: "left" | "center" | "right";
    };
    ticks: Ticks;
  };
  yAxis: {
    className?: string;
    label: {
      text: string;
      position?: "top" | "center" | "bottom";
    };
    ticks: Ticks;
  };
  line?: {
    color?: string;
    // http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8
    type?: "line" | "curve" | "step"; // line = d3.curvelinear, spline = d3.curveMonotoneX, step ? d3.curveStep
    width?: string;
    dashStyle?: "dashed" | "dotted";
  };
}

export type Data = [number, number][];

export interface Scales {
  yScale: ScaleLinear<number, number>;
  xScale: ScaleTime<number, number>;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface Margins {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface Ticks {
  count: number;
  size: number;
  padding: number;
  format?: any;
}
