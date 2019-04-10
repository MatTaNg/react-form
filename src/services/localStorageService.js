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
	return new Promise((resolve, reject) => {
			console.log("TEST", users);

        resolve(JSON.stringify(users));

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

function _delete(id) {
	return new Promise((resolve, reject) => {
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            console.log("ID", id);
            if (user.id === id) {
                users.splice(i, 1);
                localStorage.setItem('users', JSON.stringify(users));
                break;
            }
        }
        console.log("USERS", users);
        resolve(users);
	});
}

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