export function addName(name) {
	return {type: "ADD", payload: {name: name, edit: false}}
}
export function editName(i, newName) {
	return {type: "EDIT", payload: {indx: i, newName: newName}}
}
export function deleteName(name) {
	return {type: "DELETE", payload: name}
}