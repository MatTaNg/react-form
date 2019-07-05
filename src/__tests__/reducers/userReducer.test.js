import userReducer from './../../reducers/';
import * as actions from './../../actions/inputActions';
import { userConstants } from './../../constants';

let initialState;

describe('reducer', () => {
	beforeEach( () => {
		initialState = {
			userReducer: {
				loggedInUser: '',
				users: [],
				error: ''
			}
		}
	})
	it('should return initial state', () => {
	    expect(userReducer(undefined, {})).toEqual(initialState);
	});
	it('should add the loggin user to the state', () => {
		initialState.userReducer.loggedInUser = 'userName_mock';
	    expect(userReducer(undefined, {type: userConstants.LOGIN, payload: {user: {userName: 'userName_mock'}}})).toEqual(initialState);
	});
	it('should reset the currently logged in user state', () => {
		console.log("Init state", initialState);
		let initialState_mock = {...initialState}
		initialState_mock.userReducer = {loggedInUser: 'userName_mock'}
		console.log("Init state", initialState);
	    expect(userReducer(initialState_mock, {type: userConstants.LOGOUT})).toEqual(initialState);
	})
})