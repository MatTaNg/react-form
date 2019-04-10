let users = JSON.parse(localStorage.getItem('users')) || [];
let loggedInUser = localStorage.getItem('loggedInUser') || '';

export const localStorageService = {
	getAll,
	login,
	logout,
	register
}

function getAll() {
	return new Promise((resolve, reject) => {
		resolve({ text: () => Promise.resolve(JSON.stringify(users)) });	
	})
};

function logout() {
	return new Promise((resolve, reject) => {

		localStorage.setItem('loggedInUser', '');
		resolve();
	});
};

function login(userName, password) {
	return new Promise((resolve, reject) => {
		let currentUsers = users.filter(user => {
	        return user.userName === userName && user.password === password;
		});

		if(currentUsers.length) {
            let user = currentUsers[0];
	        let response = {
	            id: user.id,
	            userName: userName,
	            firstName: user.firstName,
	            lastName: user.lastName
	        }
	        localStorage.setItem('loggedInUser', userName);
			resolve( {user: () => Promise.resolve(JSON.stringify(response)) });
		} else {
			reject("Incorrect username or password");
		}
		return;
	});
};

function register(newUser) {
	return new Promise((resolve, reject) => {
	    let isDuplicateUser = users.filter(user => { return user.userName === newUser.userName; }).length;
	    if (isDuplicateUser) {
	        reject('Username "' + newUser.userName + '" is already taken');
	        return;
	    }

	    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
	    users.push(newUser);
	    localStorage.setItem('users', JSON.stringify(users));

	    resolve({ ok: true, text: () => Promise.resolve() });

	    return;
	});
};