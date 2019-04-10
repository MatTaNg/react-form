import { userConstants } from '../constants';
import { localStorageService } from '../services';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
export const userActions = {
	login,
	logout,
	register,
	_delete,
	listUsers,
	error,
	resetError
}

function login(username, password) { 
	let user = { userName: username, password: password };
	return dispatch => {
		localStorageService.login(username, password).then((response) => {
			dispatch(resetError());
			dispatch(success( { type: userConstants.LOGIN, user} )); 
		}, (err) => {
			dispatch(error(err));
		});	
	};
	
	function success(user) { return { type: userConstants.LOGIN, payload: user } };
};

function logout() { 
	return dispatch => {
		localStorageService.logout().then((response) => {
			dispatch(success());
		}, (err) => {
			dispatch(error(err));
		});
	};
	
	function success() { return { type: userConstants.LOGOUT} };
};

function _delete(id) {
	return dispatch => {
		localStorageService._delete(id).then((response) => {
			dispatch(success(response));
		}, (err) => {
			dispatch(error(err));
		});
	}
	function success(users) { return { type: userConstants.DELETE, users} };
}

function listUsers() {
	return dispatch => {
		localStorageService.listUsers().then((response) => {
			dispatch(success(JSON.parse(response)));
		}, (err) => {
			dispatch(error(err));
		})
	}

	function success(users) { return { type: userConstants.LIST_USERS, users } }
};

function register(user) { 
	return dispatch => {
		localStorageService.register(user).then((response) => {
			dispatch(resetError());
			dispatch(success(user));		
		}, (err) => {
			dispatch(error(err));
		});
	};
	function success(user) { return { type: userConstants.REGISTER, payload: user } };
};

function resetError() {
	return { type: userConstants.RESET_ERROR, payload: "" };
};

function error(err) {
	return { type: userConstants.ERROR, payload: err };
};