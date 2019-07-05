import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

import { userActions } from './../actions';
import './../styles/main.css';

export class Login extends PureComponent {

	constructor(props) {
		super(props);
		this.props.dispatch(userActions.resetError());

		this.state = {
			username: '',
			password: ''
		};
	}

	login = (e) => {
		e.preventDefault();
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
			<section className="container">

      
				<div className="content">
				
					<h1 className="heading">Login</h1>

					<form className="form">
			        	<label className="label" htmlFor="username">User Name:</label>
		      		 	<input className="input" name="username" type="text" onChange={this.handleChange} id="username"/>

		      		 	<label className="label" htmlFor="password">Password:</label>
		      		 	<input className="input" name="password" type="password" onChange={this.handleChange} id="password"/>

		      		 	<input className="btn float-element" id="login" type="submit" onClick={this.login} value="Login"></input>
	      		 	</form>

	      		 	<Link className="btn" to="/register">Register</Link>

	      		 	<br />
	      		 	<span className="error">{ this.props.error }</span>
      		 	</div>
			</section>
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

export default connectedLoginPage;