import React from "react";
import { render, unmountComponentAtNode, screen } from "react-dom";
import { act } from "react-dom/test-utils";
import RedirectHandler from "./";
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

it("renders loading state", async () => {
	jest.spyOn(global, "fetch").mockImplementation(() =>
		Promise.resolve({
			json: () => Promise.resolve()
		})
	);
	await act(async () => {
		render(<StaticRouter><RedirectHandler loading={true} /></StaticRouter>, container);
	});
	expect(container.querySelector("div").textContent).toBe(`Redirecting... `);
	global.fetch.mockRestore();
});
