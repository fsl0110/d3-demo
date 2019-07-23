import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { App } from "./app";

it("renders toMatchSnapshot", () => {
  const mock = shallow(<App />);
  expect(toJson(mock)).toMatchSnapshot();
});
