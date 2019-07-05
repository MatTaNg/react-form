import React, { Component } from 'react';
import './App.css';
import { Register } from './components';
import Login from './components/login';

class App extends Component {
  render() {
    return (
      <div>
      	<Login></Login>
      </div>
    );
  }
}

export default App;
