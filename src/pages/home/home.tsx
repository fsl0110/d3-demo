import React, { FC } from "react";
import { Link } from "react-router-dom";

export const Home: FC = () => {
  return (
    <div className="home">
      <h1>D3 Examples</h1>
      <nav>
        <Link to="/barcharts">BarCharts</Link>
        <Link to="/timelinecharts">TimelineCharts</Link>
      </nav>
    </div>
  );
};
