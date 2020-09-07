    
import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import userReducer from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Login from './components/login';
import Main from './components/main';
import Register from './components/register';
import thunk from 'redux-thunk';

const store = createStore(userReducer, applyMiddleware(thunk));

const routes = (
	<Router>
		<Switch>
			<Route path="/login" component={Login} />		
			<Route path="/register" component={Register} />
			<Route path="/main" component={Main} />
			<Route path="/" component={App} />
		</Switch>
	</Router>
)

ReactDOM.render(
	<Provider store={store}>
		{ routes }
	</Provider>, 
	document.getElementById('root')
);

serviceWorker.unregister();