let users = JSON.parse(localStorage.getItem('users')) || [];
let loggedInUser = localStorage.getItem('loggedInUser') || '';

export const localStorageService = {
	login,
	logout,
	_delete,
	listUsers,
	register
}

function listUsers() {
	console.log("Mock ListUsers");
	return Promise.resolve();
};

function logout() {
	console.log("Mock Logout");
	return Promise.resolve();
};

function login(userName, password) {
	console.log("Mock login");
	return Promise.resolve();
};

function _delete(id) {
	console.log("Mock delete")
	return Promise.resolve();
}

function register(newUser) {
	console.log("Mock Register");
	return Promise.resolve();
};