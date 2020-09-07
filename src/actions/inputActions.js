import { userConstants } from '../constants';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
export const userActions = {
	login,
	logout,
	register,
	_delete,
	listUsers,
	error,
	resetError
}

function login(userName, password) { 
	let user = { userName: userName, password: password };
	return dispatch => {
		axios.get(`${BASE_URL}/users/${userName}`).then((response) => {
			if(response.data === true) {
				dispatch(resetError());
				dispatch(success( { type: userConstants.LOGIN, user} )); 
			}
			else {
				dispatch(error("Incorrect username or password"))
			}
		}).catch((e) => {
			dispatch(error(e));
		})
	};
	
	function success(user) { return { type: userConstants.LOGIN, payload: user } };
};

function logout() { 
	return dispatch => {
		dispatch(success());
	};
	
	function success() { return { type: userConstants.LOGOUT} };
};

function _delete(userName) {
	return dispatch => {
		axios.delete(`${BASE_URL}/users/${userName}`).then((response) => {
			dispatch(success(response.data));
		}).catch((e) => {
			dispatch(error(e));
		})
	}
	function success(users) { return { type: userConstants.DELETE, users} };
}

function listUsers() {
	return dispatch => {
		axios.get(`${BASE_URL}/users`).then((response) => {
			dispatch(success(response.data));
		}).catch((e) => {
			dispatch(error(e));
		})
	}

	function success(users) { return { type: userConstants.LIST_USERS, users } }
};

function register(user) { 
	return dispatch => {
		return axios.post(`${BASE_URL}/users`, user).then((response) => {
			console.log(response.data)
			if(!response.data) {
				dispatch(error("User already exists"))
			}
			else {
				dispatch(resetError());
				dispatch(success(user));
			}
		}).catch((e) => {
			dispatch(error(e.status));
		})
	};
	function success(user) { return { type: userConstants.REGISTER, payload: user } };
};

function resetError() {
	return { type: userConstants.RESET_ERROR, payload: "" };
};

function error(err) {
	return { type: userConstants.ERROR, payload: err };
};