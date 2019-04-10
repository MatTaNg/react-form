import { createStore } from 'redux'
import { userConstants } from '../constants';

const initialState = {
	loggedInUser: '',
	users: [],
	error: ''
}

export function userReducer(state = initialState, action) {
	let originalState = {...state};
	switch (action.type) {
		case userConstants.LOGIN:
			let newUserName = action.payload.user.userName;
			originalState.loggedInUser = newUserName;
			return originalState;
		case userConstants.LOGOUT:
			originalState.loggedInUser = '';
			return originalState;
		case userConstants.ERROR:
			originalState.error = action.payload;
			return originalState;
		case userConstants.RESET_ERROR:
			originalState.error = action.payload;
			return originalState;
		default:
			return state;
	}
}