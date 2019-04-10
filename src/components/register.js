import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

import { userActions } from './../actions';

class Register extends PureComponent {
	constructor(props) {
		super(props);

		this.props.dispatch(userActions.resetError());
		this.state = {
			user: {
				firstName: '',
				lastName: '',
				userName: '',
				password: ''
			}
		}
	}

	handleFormChange = (e) => {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
	}

	submitForm = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.userName && user.password) {
            this.props.dispatch(userActions.register(user));
        }
        this.props.history.push("/login");
	}

	render() {
        const { user } = this.state;
		return (
			<div>
				<h1>Register</h1>
				<form name="registrationForm" onSubmit={this.submitForm}>
					<label htmlFor="firstName">First Name</label>
					<input type="text" name="firstName" value={user.firstName} onChange={this.handleFormChange} />

					<label htmlFor="lastName">Last Name</label>
					<input type="text" name="lastName" value={user.lastName} onChange={this.handleFormChange} />

					<label htmlFor="userName">User Name</label>
					<input type="text" name="userName" value={user.userName} onChange={this.handleFormChange} />

					<label htmlFor="password">Password</label>
					<input type="password" name="password" value={user.password} onChange={this.handleFormChange} />

					<input type="submit" name="submit" value="Register" />
				</form>

      		 	<Link to="/login">Cancel</Link>

      		 	<br />
      		 	{ this.props.error }
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
		error: state.userReducer.error
    };
}

const connectedRegisterPage = connect(mapStateToProps)(Register);
export { connectedRegisterPage as Register };