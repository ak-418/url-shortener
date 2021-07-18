import React from "react";
import { render, unmountComponentAtNode, screen } from "react-dom";
import { act } from "react-dom/test-utils";
import Shortener from "./shortener";
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

const dummyData = {
  to: "https://google.com",
  from: "7estUrl"
};

it("renders dummy data", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(dummyData)
    })
  );
  await act(async () => {
    render(<StaticRouter><Shortener created={dummyData} /></StaticRouter>, container);
  });
  expect(container.querySelector("#success-msg").textContent).toBe(`Shortened URL created!Access it at https://localhost/${dummyData.from}`);
  global.fetch.mockRestore();
});

it("form submit should trigger function", () => {
  const onMock = jest.fn();
  const wrapper = shallow(<Shortener handleSubmit={onMock} />);
  const form = wrapper.find("#form");
  form.simulate("submit", { preventDefault: () => { } });
  expect(onMock).toHaveBeenCalled();
});