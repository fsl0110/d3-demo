import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Bar1a } from "./bar1a";

it("renders toMatchSnapshot", () => {
  expect(toJson(shallow(<Bar1a />))).toMatchSnapshot();
});
