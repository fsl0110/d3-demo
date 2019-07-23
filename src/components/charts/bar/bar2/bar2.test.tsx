import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Bar2 } from "./bar2";

it("renders toMatchSnapshot", () => {
  expect(toJson(shallow(<Bar2 data={} />))).toMatchSnapshot();
});
