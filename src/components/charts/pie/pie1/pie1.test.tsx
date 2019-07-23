import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Pie1 } from "./pie1";

it("renders toMatchSnapshot", () => {
  expect(toJson(shallow(<Pie1 />))).toMatchSnapshot();
});
