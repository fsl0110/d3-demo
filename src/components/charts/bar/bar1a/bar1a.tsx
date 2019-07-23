import React, { PureComponent, createRef } from "react";
import * as d3 from "d3";

export class Bar1a extends PureComponent {
  private ref = createRef<SVGSVGElement>();

  componentDidMount() {
    const data = [
      {
        y: "red",
        x: 10
      },
      {
        y: "blue",
        x: 20
      },
      {
        y: "green",
        x: 30
      }
    ];

    const x = d3
      .scaleLinear()
      .range([0, 500])
      .domain([0, 40]);

    const xAxisGenerator = d3.axisBottom(x).scale(x);

    const svg = d3
      .select(this.ref.current)
      .append("g")
      .attr("transform", "translate(50,0)");

    svg
      .append("g")
      .call(xAxisGenerator)
      .attr("transform", "translate(0,100)");

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => (i + 1) * 25)
      .attr("width", (d: any, i) => x(d.x))
      .attr("height", "20")
      .style("fill", (d, i) => d.y);
  }

  render() {
    return (
      <svg width="600" height="300" className="svg__canvas" ref={this.ref} />
    );
  }
}
