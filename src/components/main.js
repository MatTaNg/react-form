import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

import { userActions } from '../actions';
import './../styles/main.css';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount () {
		this.props.dispatch(userActions.listUsers())
	}

	handleLogOut = () => {
		this.props.dispatch(userActions.logout());
	};

	deleteUser = id => e => {
		this.props.dispatch(userActions._delete(id));		
	}

	makeUserList = () => {	
		let result = [];
		for(let i = 0; i < this.props.users.length; i++) {
			result.push(
				<li key={i}>{this.props.users[i].userName} 
					<span value={i} className="delete" onClick={this.deleteUser(this.props.users[i].id)}> Delete </span> 
				</li>);
		}
		return this.props.users.length === 0 ? [] : result;
	}

	render() {
		let userList = this.makeUserList();
		if(this.props.user === "") {
			return <Redirect to="/login" />
		}
		return (
			<section className="container">			
				<div className="content content-main">
					<h1 className="heading" >Welcome { this.props.user } ! </h1>
					<ol>
						{ userList }
					</ol>
	  		 		<button className="btn" onClick={this.handleLogOut} >Log Out</button>
  		 		</div>
			</section>
		);
	}
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.loggedInUser,
        users: state.userReducer.users
    };
}

const connectedRegisterPage = connect(mapStateToProps)(Main);
export { connectedRegisterPage as Main };