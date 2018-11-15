import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="Initial">
        
        <div className="Title"> 
          GradBridge
        </div>
        <div className="Text">
          Welcome! <br></br>
          GradBridge provides information related to admission of KAIST graduate school.
          <br></br>
          Previous applicants can collaborate to make GradBridge more reliable and awesome!s
          <br></br>
          <br></br>
          To get started, click on the department that you are interested in.
        </div>
        <div className="Major">
        <img id="CS" src={require('./images/CS.png')}/>
        <img id="EE" src ={require('./images/EE.png')}/>
        <img id="ME" src ={require('./images/ME.png')}/>
        <img id="AE" src ={require('./images/AE.png')}/>
        </div>
      </div>
    );
  }
}

export default App;