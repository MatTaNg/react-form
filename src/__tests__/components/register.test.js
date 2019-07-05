import React from "react";
import { shallow, mount, render } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";
import { Register } from "./../../components/register";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { userActions } from './../../actions';

// jest.mock('./__mocks__/api');
let wrapper;
let dispatch;
let props;
let userActions_spy; 

describe("Register", () => {

	beforeEach(() => {
		dispatch = jest.fn();
		props = {
			dispatch,
			error: ''
		};
		wrapper = mount(<Router><Register {...props} /></Router>);
	});
	it("renders without crashing", () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it("should dispatch resetError action", () => {
		userActions_spy = jest.spyOn(userActions, 'resetError');
		wrapper = mount(<Router><Register {...props} /></Router>);
		expect(userActions_spy).toHaveBeenCalled();
	});
	// it("should dispatch a register action on form submit", () => {
	// 	let mock_user = { user: {
	// 		firstName: 'mockFN',
	// 		lastName: 'mockLN',
	// 		userName: 'mockUN',
	// 		password: 'mockPW'
	// 	} };
	// 	userActions_spy = jest.spyOn(userActions, 'register');
	// 	wrapper = mount(<Router><Register {...props} /></Router>);		
	// 	wrapper.setState(mock_user, () => {
	// 		console.log("Wrapper", wrapper.instance());
	// 		wrapper.find('#register').simulate('submit'); 
	// 		expect(userActions_spy).toHaveBeenCalled();
	// 	});
	// });
	it("should dispatch an error action if the fields are empty on form submit", () => {
		userActions_spy = jest.spyOn(userActions, 'error');
		wrapper = mount(<Router><Register {...props} /></Router>);		
		wrapper.find('#register').simulate('submit'); 
		expect(userActions_spy).toHaveBeenCalled();
	});
});