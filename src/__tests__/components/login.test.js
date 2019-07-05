import React from "react";
import { shallow, mount, render } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";
import { Login } from "./../../components/login";
import { Main } from "./../../components/main";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { userActions } from './../../actions';

// jest.mock('./__mocks__/api');
const mockStore = configureStore();
const initialState = {
	userReducer: {
		loggedInUser: "",
		users: [],
		error: ""
	}  
};
const store = mockStore(initialState);
let wrapper;
let dispatch;
let props;

const filterKeys = (state) => {
console.log("State", state.node.instance.history.location);
  if (state.routes) { 
    return {
      ...state,
      routes: state.routes.map((route) => {
        const { key, ...others } = route
        return filterKeys(others)
      }),
    }
  }
  return state
}

describe("Pokedex", () => {

	beforeEach(() => {
		dispatch = jest.fn();
		props = {
			dispatch, 
			error: '',
			loggedInUser: ''
		};
		wrapper = mount(<Router><Login {...props} /></Router>);
		store.clearActions();
	});
	it("renders without crashing", () => { 
		expect(toJson(wrapper.find(Login))).toMatchSnapshot();
	});
	it("Dispatched login action on login button click", () => {
		const userActions_spy = jest.spyOn(userActions, 'login');
		wrapper
			.find("#username")
			.simulate("change", {
				target: { name: "username", value: "test-username" }
			});
		wrapper
			.find("#password")
			.simulate("change", {
				target: { name: "password", value: "test-password" }
			});
		wrapper.find("#login").simulate("click");
		expect(userActions_spy).toHaveBeenCalledWith("test-username", "test-password");
	});
});
it("Should redirect if user is already loggedIn", () => {
	dispatch = jest.fn();
	props = {
		dispatch,
		error: '',
		loggedInUser: 'matt-test'
	};
	wrapper = mount(<Router><Login {...props} /></Router>);
	expect(toJson(wrapper.find(Main))).toMatchSnapshot();
})