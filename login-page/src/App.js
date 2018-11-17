import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className = "sign-up-page">
        <div className = "Top">
          <div className="Top-Title">
            <img id="top-logo" src={require('./images/logo.png')}/>
            <p>GradBridge</p>
          </div>
        </div>
        <div className = "log-in-box">

          <div className = "Sign-up-left">
            <div className = "user-info">
              <button className = "Sing-up-category"> 
              <div id = "sign-up-type">E-mail</div>
              </button>
              <div>
                <input className ="sign-up-input"></input>
              </div>
            </div>
            <div className = "user-info">
              <button className = "Sing-up-category">
                <div id = "sign-up-type">Password</div>
              </button>
              <div>
                <input type="password" className ="sign-up-input"></input>
              </div>
            </div>
          </div>
        
        <div className = "sign-up-right">
          <div className ="button-wrapper">
            <div className = "login-button">
              <button className = "sign-up-login">
                <div id = "login-btn">LOG IN</div>
              </button>
            </div>
          </div>
        </div>
        </div>

        <div className = "login-additional">
          <p>Forgot password?  	
<a href="xxx">Click here</a> </p>
          <p>Don't have an account?  	
<a href="xxx">Sign up</a></p>
        </div>
      </div>
    );
  }
}

export default App;
