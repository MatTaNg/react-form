import { userActions } from './../../actions';
import { localStorageService } from './../../services';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const test_data = {
	username: 'name_mock',
	password: 'password_mock'
};
const mockStore = configureStore([thunk]);
const initialState = {
	userReducer: {
		loggedInUser: "",
		users: [],
		error: ""
	}  
};
const store = mockStore(initialState);
jest.mock('./../../services/localStorageService');

describe("Login action should call localstorage login", () => {
	// it("TEST", (done) => {
	// 	let localStorage_spy = jest.spyOn(localStorageService, 'login');
	// 	// console.log("userActions.login(test_data.username, test_data.password)()", userActions.login(test_data.username, test_data.password)()); 
 //  	    store.dispatch(userActions.login(test_data.username, test_data.password)()).then( () => {
	//     	expect(localStorage_spy).toHaveBeenCalled();  
	//     	done();
	//     });
	// })
});

describe("Logout action should call localstorage logout", () => {

});

describe("Register action should call localstorage register", () => {

});

describe("delete action should call localstorage delete", () => {

});

describe("ListUsers action should call localstorage listUsers", () => {

});

describe("Error action should call localstorage error", () => {

});

describe("ResetError action should call localstorage resetError", () => {

});