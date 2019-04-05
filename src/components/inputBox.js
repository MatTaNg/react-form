import React, { Component } from 'react';
import { addName, editName, deleteName } from './../actions/inputActions';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import ListComponent from './listComponent';

export class InputBox extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			users: []
		};
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			users: newProps.users
		})
	}

	validate = (e) => {
		this.setState({
			name: e.target.value
		});
	};

	add = (e) => {
		this.props.addName(this.state.name);
	}

	edit = (i) => (e) => {
		let newState = [...this.state.users];
		newState[i].edit = true;
		this.setState({
			users: newState
		});
	}

	createUserList = () => {
		let userList = [];
		for(let i = 0; i < this.state.users.length; i++) {
			userList.push(this.userElement(i));
		}
		return userList;
	}

	closeEdit = (i) => () => {
		let newState = [...this.state.users];
		newState[i].edit = false;
		this.setState({
			users: newState
		})
	}

	changeUser = (i) => {
		let newState = [...this.state.users]
		this.props.editName(i, this.state.users[i].name);
		this.closeEdit(i);
	}

	submitChange = (i) => () => {
		let newState = [...this.state.users]
		newState[i].edit = false;
		this.setState({
			users: newState
		})
		this.props.editName(i, this.state.users[i].name);

	}

	delete = (i) => () => {
		let newState = [...this.state.users];
		this.props.deleteName(newState[i].name);
	}

	editUser = (i) => {
		return (
			<div>
				<input type="text" value={this.state.users[i].name}/>
				<input type="submit" onClick={this.submitChange(i)} />
				<span onClick={this.closeEdit(i)}>close</span>
				<span onClick={this.delete(i)}>delete</span>
			</div>
		)
	}

	render() {
		return (
			<div>
	        	<label>Name</label>
      		 	<input type="text" onChange={this.validate} id="name"/>
      		 	<input type="submit" onClick={this.add} value="Add"></input>
      		 	<ul>
      		 		{this.state.users && this.createUserList()}
      		 	</ul>
			</div>
		);
	};

	userElement = (i) => {
		return (
			<div>
				<li key={i}>{this.state.users[i].name}
					<span onClick={this.edit(i)}>Edit</span>
					{ this.state.users[i].edit && this.editUser(i) }
					
				</li>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({"addName": addName, "deleteName": deleteName, "editName": editName}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(InputBox)