import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

import { userActions } from '../actions';

class Main extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	handleLogOut = () => {
		this.props.dispatch(userActions.logout());
	};

	render() {
		if(this.props.logout === "") {
			return <Redirect to="/login" />
		}
		return (
			<div>
				<h1>Welcome { this.props.user } ! </h1>
  		 		<button onClick={this.handleLogOut} >Log Out</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        logout: state.userReducer.loggedInUser
    };
}

const connectedRegisterPage = connect(mapStateToProps)(Main);
export { connectedRegisterPage as Main };