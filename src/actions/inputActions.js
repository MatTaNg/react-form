import { userConstants } from '../constants';
import { localStorageService } from '../services';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
export const userActions = {
	login,
	logout,
	register,
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
	function error(error) { return { type: userConstants.ERROR, payload: error } };
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
	function error(error) { return { type: userConstants.ERROR, payload: error } };
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
	function error(error) { return { type: userConstants.ERROR, payload: error } };
};

function resetError() {
	return { type: userConstants.RESET_ERROR, payload: "" };
};