import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Timeline1 } from "./timeline1";

it("renders toMatchSnapshot", () => {
  expect(toJson(shallow(<Timeline1 />))).toMatchSnapshot();
});
