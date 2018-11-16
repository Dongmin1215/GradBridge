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
        <div className = "sign-up-row">


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
            <div className = "user-info">
              <button className = "Sing-up-category">
                <div id = "sign-up-type">Check Password</div>
              </button>
              <div>
                <input type="password" className ="sign-up-input"></input>
              </div>
            </div>


            <div className = "user-info">
              <button className = "Sing-up-category">
                <div id = "sign-up-type">Undergraduate University</div>
              </button>
              <div>
                <select  className = "sign-up-selection">
                  <option value="etc">Select your Undergraduate University</option>
                  <option value="a">KAIST</option>
                  <option value="b">Others</option>
                </select>
              </div>
            </div>


            
           
            
            </div>

            <div className = "sign-up-right">
              <div className = "user-info">
                <button className = "sign-up-category-right">
                  <div id = "sign-up-type-right">Undergraduate Major</div>
                </button>
                <div>
                  <select  className = "sign-up-selection">
                    <option value="etc">Select your Undergraduate Major</option>
                    <option value="a">Computer Science</option>
                    <option value="b">Electrical Engineering</option>
                    <option value="c">Mechanical Engineering</option>
                    <option value="d">Aerospace Engineering</option>
                  </select>
                </div>
              </div>

              <div className = "user-info">
                <button className = "sign-up-category-right">
                  <div id = "sign-up-type-right">GPA</div>
                </button>
                <div>
                <select  className = "sign-up-selection">
                    <option value="etc">Select your GPA range (Out of 4.3)</option>
                    <option value="a">0.0 ~ 2.5</option>
                    <option value="b">2.5 ~ 3.0</option>
                    <option value="c">3.0 ~ 3.5</option>
                    <option value="d">3.5 ~ 4.0</option>
                    <option value="d">4.0 ~ 4.3</option>
                  </select>
                </div>
              </div>

              <div className = "user-info">
                <button className = "sign-up-category-right">
                  <div id = "sign-up-type">Admission Year</div>
                </button>
                <div>
                  <select  className = "sign-up-selection">
                    <option value="etc">Select your Admission Year</option>
                    <option value="a">Not Applied yet</option>
                    <option value="a">2019 Spring</option>
                    <option value="b">2018 Fall</option>
                    <option value="c">2018 Spring</option>
                    <option value="d">2017 Fall</option>
                    <option value="d">Before</option>
                  </select>
                </div>
              </div>
              <div className = "user-info">
                <button className = "sign-up-category-right">
                  <div id = "sign-up-type">Applied Department</div>
                </button>
                <div>
                  <select  className = "sign-up-selection">
                    <option value="etc">Select your Applied Department</option>
                    <option value="a">Computer Science</option>
                    <option value="b">Electrical Engineering</option>
                    <option value="c">Mechanical Engineering</option>
                    <option value="d">Aerospace Engineering</option>
                  </select>
                </div>

              </div>
            </div>
          
        </div>
        <div className ="button-wrapper">
          <div className = "register-button">
            <button className = "sign-up-register">
              <div id = "sign-up-type">Register</div>
            </button>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
