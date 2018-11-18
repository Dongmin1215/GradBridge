import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';



const WikiPage = () =>
    <div className='wiki'>
        <div className = "top">
          <div className="top-title">
          <Link to={routes.LANDING}>
            <img id="top-logo" src={require('./images/logo.png')}/>
          </Link>
          </div>
        </div>

        <div className="wiki-navbar-row">
          <div className='wiki-navbar-left'>
            <div className='wiki-navbar-text'>Department : Computer Science</div>
          </div>
          <div className='wiki-navbar-right'>
            <div className='wiki-past-year'>(2018 Fall)</div>
            <div className= 'wiki-arrow-left'>
                <i className="fa fa-angle-double-left"></i>
            </div> 
            <div className='wiki-navbar-text' id = 'wiki-year'>2019 Spring</div>
            <div className='wiki-navbar-signin'>
              <div className='wiki-signin-wrapper'>
                <Link to={routes.SIGN_IN}>
                  <button className='wiki-signin'>
                    <div id='wiki-signin-text'>Log In</div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="wiki-main">
          <div className='wiki-main-row'>
            <div className = "wiki-info-col">
              <div className = 'wiki-info-wrapper'>
              
                <div className = 'wiki-info-doc'>
                  <div className = 'wiki-info-title'>
                    Document Review
                  </div>
                  
                  <div className = 'wiki-info-subtitle'>
                    <ul>
                      <li>Self Introduction</li>
                      <div className = 'wiki-info-qid'>
                        <ul>
                          <li> In what language?</li>
                        </ul>
                      </div>
                    </ul>
                  </div>

                  <div className = 'wiki-info-subtitle'>
                    <ul>
                      <li>Extra</li>
                      <div className = 'wiki-info-qid'>
                        <ul>
                          <li> ~~~~~~~</li>
                        </ul>
                      </div>
                    </ul>
                  </div>

                  <div className = 'wiki-info-subtitle'>
                    <ul>
                      <li>Hello</li>
                      <div className = 'wiki-info-qid'>
                        <ul>
                          <li>##########</li>
                        </ul>
                      </div>
                    </ul>
                  </div>

                  <div className = 'wiki-info-subtitle'>
                    <ul>
                      <li>Hello</li>
                      <div className = 'wiki-info-qid'>
                        <ul>
                          <li>##########</li>
                        </ul>
                      </div>
                    </ul>
                  </div>

                  <div className = 'wiki-info-subtitle'>
                    <ul>
                      <li>Hello</li>
                      <div className = 'wiki-info-qid'>
                        <ul>
                          <li>##########</li>
                        </ul>
                      </div>
                    </ul>
                  </div>


                </div>

                <hr></hr>
                
                <div className = 'wiki-info-interviews'>
                  <div className = 'wiki-info-title'>
                    Extra Curricular
                  </div>
                  <div className = 'wiki-info-subtitle'>
                    <ul>
                      <li>Self Introduction</li>
                      <div className = 'wiki-info-qid'>
                        <ul>
                          <li> In what language?</li>
                        </ul>
                      </div>
                    </ul>
                  </div>
                  <div className = 'wiki-info-subtitle'>
                    <ul>
                      <li>Extra</li>
                      <div className = 'wiki-info-qid'>
                        <ul>
                          <li> ~~~~~~~</li>
                        </ul>
                      </div>
                    </ul>
                  </div>

                </div>
              </div>

            </div>




            <div className='wiki-comment-col'>
              <div className='wiki-comment-wrapper'>
                <div className = 'wiki-comment-filter'>

                  <div className='wiki-comment-filter-row'>

                    <div className ='wiki-comment-filter-col'>
                      <div className = 'wiki-comment-filter-wrapper'>
                          <select className = "wiki-comment-filter-select">
                            <option>University</option>
                            <option>KAIST</option>
                            <option>Others</option>
                          </select>
                        </div>
                    </div>

                    <div className ='wiki-comment-filter-col'>
                      <div className = 'wiki-comment-filter-wrapper'>
                        <select className = "wiki-comment-filter-select">
                          <option>Under. Major</option>
                          <option>CS</option>
                          <option>Others</option>
                        </select>
                      </div>
                    </div>

                    <div className ='wiki-comment-filter-col'>
                      <div className = 'wiki-comment-filter-wrapper'>
                        <select className = "wiki-comment-filter-select">
                          <option>GPA</option>
                          <option>0.0 ~ 2.5</option>
                          <option>2.5 ~ 3.0</option>
                          <option>3.0 ~ 3.5</option>
                          <option>3.5 ~ 4.0</option>
                          <option>4.0 ~ 4.3</option>
                        </select>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className = 'wiki-comment-user'>
                  <div className = 'wiki-comment-user-box'>
                    <div className = 'wiki-comment-user-row'>
                      <div className = 'wiki-comment-user-col-left'>
                        <img className = 'user-pic' src={require('./images/user.png')}/>
                      </div>
                      <div className = 'wiki-comment-user-col-right'>
                        <div className = 'wiki-comment-user-context'>
                        How did you implement page table in the pintos project?
                        </div>
                      </div>
                    
                    </div>
                    
                  </div>
                  
                  <div className = 'wiki-comment-user-box'>
                  </div>
                  <div className = 'wiki-comment-user-box'>
                  </div>
                  
                  <div className = 'wiki-comment-user-box'>
                  </div>
                  <div className = 'wiki-comment-user-box'>
                  </div>
                  
                  <div className = 'wiki-comment-user-box'>
                  </div>
                
                </div>


              </div>
            
            </div>
          </div>
        </div>

    </div>

export default WikiPage;
