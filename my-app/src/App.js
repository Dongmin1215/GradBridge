import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="Initial">
      <img src={require('./img/graduation.png')}/>
        <div className="Title"> 
          GradBridge
        </div>
        <div>
          Welcome! 
          GradBridge provides information related to admission of KAIST graduate school.
        </div>
      </div>
    );
  }
}

export default App;