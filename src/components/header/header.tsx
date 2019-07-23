import React, { FC, HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** This component does not support custom children. */
  children?: never;
}

export const Header: FC<Props> = () => {
  return (
    <header className="header">
      <nav>
        <NavLink exact to="/" className="link">
          Home
        </NavLink>
        <NavLink to="/barcharts" className="link">
          BarCharts
        </NavLink>
        <NavLink to="/timelinecharts" className="link">
          TimelineCharts
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
