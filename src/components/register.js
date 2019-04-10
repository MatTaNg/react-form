import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

import { userActions } from './../actions';
import './../styles/main.css';

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
			},
			error: ''
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

        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.userName && user.password) {
            this.props.dispatch(userActions.register(user));
        } else {
        	this.setState({
        		error: "Form Incomplete"
        	})
        }
        if(this.props.error === "") {
	    	this.props.history.push("/login");	
		}
	}

	render() {
        const { user } = this.state;
		return (
			<section className="container">


				<div className="content">
					<h1 className="heading">Register</h1>
					<form className="form" name="registrationForm" onSubmit={this.submitForm}>
						<label className="label" htmlFor="firstName">First Name</label>
						<input className="input" type="text" name="firstName" value={user.firstName} onChange={this.handleFormChange} />

						<label className="label" htmlFor="lastName">Last Name</label>
						<input className="input" type="text" name="lastName" value={user.lastName} onChange={this.handleFormChange} />

						<label className="label" htmlFor="userName">User Name</label>
						<input className="input" type="text" name="userName" value={user.userName} onChange={this.handleFormChange} />

						<label className="label" htmlFor="password">Password</label>
						<input className="input" type="password" name="password" value={user.password} onChange={this.handleFormChange} />

						<input className="submit" type="submit" name="submit" value="Register" />
					</form>
				
	      		 	<Link className="redirect" to="/login">Cancel</Link>

	      		 	<br />
	      		 	<span className="error">{ this.state.error }</span>
      		 	</div>
			</section>
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