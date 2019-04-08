import { createStore } from 'redux'

export default function inputReducer(state = { users: [], }, action) {
	let originalUsers = [...state.users];
	console.log("Action", action);
	switch (action.type) {
		case 'ADD':
			let users = state.users.concat(action.payload);
			return {users};
		case 'EDIT':
			originalUsers[action.payload.indx].name = action.payload.newName;
			return {users: originalUsers};
		case 'DELETE':
			for(let x = 0; x < state.users.length; x++) {
				if(state.users[x].name === action.payload) {
					originalUsers.splice(x, 1);
					
				}
			}
			return {users: originalUsers}
		default:
			return state
	}
}