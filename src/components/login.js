import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

import { userActions } from './../actions';

class Login extends PureComponent {

	constructor(props) {
		super(props);
		this.props.dispatch(userActions.resetError());

		this.state = {
			username: '',
			password: ''
		};
	}

	login = (e) => {
		this.props.dispatch(userActions.login(this.state.username, this.state.password));
	}


	handleChange = (e) => {
		const {name, value } = e.target;
		this.setState({ [name]: value });
	}

	render() {
		if(this.props.loggedInUser !== "") {
			return <Redirect to="/main" />
		}
		return (
			<div>
				<h1>Login</h1>

	        	<label htmlFor="username">User Name:</label>
      		 	<input name="username" type="text" onChange={this.handleChange} id="username"/>

      		 	<label htmlFor="password">Password:</label>
      		 	<input name="password" type="password" onChange={this.handleChange} id="password"/>

      		 	<input type="submit" onClick={this.login} value="Login"></input>

      		 	<Link to="/register">Register</Link>

      		 	<br />
      		 	{ this.props.error }
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
		error: state.userReducer.error,
		loggedInUser: state.userReducer.loggedInUser
	}
}

const connectedLoginPage = connect(
	mapStateToProps
	)(Login);

export { connectedLoginPage as Login};