import React, { Component } from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa';


import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='wiki'>
        <div className = "Top">
          <div className="Top-Title">
            <img id="top-logo" src={require('./images/logo.png')}/>
            <p>GradBridge</p>
          </div>
        </div>

        <div className="wiki-navbar-row">
          <div className='wiki-navbar-left'>
            <div className='wiki-navbar-text'>Department : Computer Science</div>
          </div>
          <div className='wiki-navbar-right'>
            <div className='wiki-past-year'>(2018 Fall)</div>
            <div className= 'wiki-arrow-left'>
              <FaAngleDoubleLeft />
            </div> 
            <div className='wiki-navbar-text'>2019 Spring</div>
            <div className='wiki-navbar-signin'>
              <div className='wiki-signin-wrapper'>
                <button className='wiki-signin'>
                
                  <div id='wiki-signin-text'>Sign In</div>
                </button>
              </div>
            </div>
          </div>


        </div>
        
        <div className="wiki-main">
          <div className='wiki-main-row'>
            <div className = "wiki-info-col">
              <div className = 'wiki-info-wrapper'>
              </div>

            </div>
            <div className='wiki-comment-col'>
              <div className='wiki-comment-wrapper'>
              
              </div>
            
            </div>
          </div>
          
        
        </div>
      </div>
    );
  }
}

export default App;
