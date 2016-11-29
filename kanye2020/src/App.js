import React, { Component } from 'react';
import TeamSignUp from './TeamSignUp';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Sign Up</h1>
          <h2>Our service is fun and awesome, but you must be 13 years old to join</h2>
        </div>
        <hr />
        <TeamSignUp />
      </div>
    );
  }
}

export default App;