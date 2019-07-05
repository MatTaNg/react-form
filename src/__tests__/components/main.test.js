import React from "react";
import { shallow, mount, render } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";
import { Main } from "./../../components/main";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { userActions } from './../../actions';

// jest.mock('./__mocks__/api');
let wrapper;
let dispatch;
let props;
let userActions_spy;

describe("Main", () => { 
	beforeEach(() => {
		dispatch = jest.fn();
		userActions_spy = jest.spyOn(userActions, 'listUsers');
		props = {
			dispatch, 
			user: 'test_user',
			users: [{"userName": 'matt'}]
		};
		wrapper = mount(<Router><Main {...props} /></Router>);
	});
	it("renders without crashing", () => {
		expect(toJson(wrapper.find(Main))).toMatchSnapshot();
	});
	it("componentDidMount should call listUsers", () => {
		expect(userActions_spy).toHaveBeenCalled();
	});
	it("clicking on logout should dispatch a logout action", () => {
		userActions_spy = jest.spyOn(userActions, 'logout');
		wrapper.find("#logout").simulate("click");
		expect(userActions_spy).toHaveBeenCalled(); 
	});
	it("clicking on delete should dispatch a delete action", () => {
		userActions_spy = jest.spyOn(userActions, '_delete');
		wrapper.find(".delete").simulate("click");
		expect(userActions_spy).toHaveBeenCalled(); 
	});
}); 