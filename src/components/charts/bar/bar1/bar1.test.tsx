import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Bar1 } from "./bar1";

it("renders toMatchSnapshot", () => {
  expect(toJson(shallow(<Bar1 />))).toMatchSnapshot();
});
