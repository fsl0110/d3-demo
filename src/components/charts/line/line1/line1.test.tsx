import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Line1 } from "./line1";

it("renders toMatchSnapshot", () => {
  expect(toJson(shallow(<Line1 />))).toMatchSnapshot();
});
