import { userConstants } from '../constants';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
let access_token = '';
axios.defaults.headers = {
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${access_token}`
}

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
		axios.post(`${BASE_URL}/login`, {
			username: userName,
			password: password
		}).then((response) => {
			localStorage.setItem('token', `Bearer ${response.data.jwt}`);
			dispatch(resetError());
			dispatch(success( { type: userConstants.LOGIN, user} )); 
		}).catch((e) => {
			if(e.message.indexOf('403') !== -1)
				dispatch(error("Incorrect username or password"))
			else {
				dispatch(error("Something went wrong"))
			}
		})
	};
	
	function success(user) { return { type: userConstants.LOGIN, payload: user } };
};

function logout() { 
	return dispatch => {
		localStorage.setItem('token', '');
		dispatch(resetError());
		dispatch(success());
	};
	
	function success() { return { type: userConstants.LOGOUT} };
};

function _delete(userName) {
	const token = localStorage.getItem('token');
	return dispatch => {
		axios.delete(`${BASE_URL}/accounts`, 
			{
				data: `${userName}`,
				headers: {'Authorization': token}
			}
			
		).then((response) => {
			dispatch(success(userName));
		}).catch((e) => {
			dispatch(error(e));
		})
	}
	function success(userName) { return { type: userConstants.DELETE, payload: userName} };
}

function listUsers() {
	const token = localStorage.getItem('token');
	return dispatch => {
		axios.get(`${BASE_URL}/accounts`, {headers: {'Authorization': token}}).then((response) => {
			dispatch(success(response.data));
		}).catch((e) => {
			dispatch(error(e));
		})
	}

	function success(users) { return { type: userConstants.LIST_USERS, users } }
};

function register(user) { 
	return dispatch => {
		return axios.post(`${BASE_URL}/accounts`, user).then((response) => {
			if(!response.data) {
				dispatch(error("Account already exists"))
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