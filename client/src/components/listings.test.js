import React from "react";
import { render, unmountComponentAtNode, screen } from "react-dom";
import { act } from "react-dom/test-utils";
import Listings from "./listings";
import { StaticRouter } from "react-router-dom";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const dummyData = [{
  to: "https://google.com",
  from: "7estUrl"
}];

it("renders existing data", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(dummyData)
    })
  );

  const wrapper = shallow(<Listings
    data={dummyData}
  />);

  expect(wrapper.find(".header").length).toEqual(1);
  expect(wrapper.find(".entry").length).toEqual(dummyData.length);
  global.fetch.mockRestore();
});

it("renders empty data", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(dummyData)
    })
  );

  const wrapper = shallow(<Listings
    data={[]}
  />);

  expect(wrapper.find(".header").length).toEqual(0);
  expect(wrapper.find(".entry").length).toEqual(0);
  expect(wrapper.find("#empty-result").text()).toBe(`No URLs added so far!`);
  global.fetch.mockRestore();
});
