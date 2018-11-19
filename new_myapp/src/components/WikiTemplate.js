import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignOutButton from './SignOut';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

export default class WikiTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div className='wiki'>
        <div className = "top">
            <div className="Title">
              <img id="top-logo" src={require('./images/logo.png')}/>
            </div>
          </div>
          <div className="wiki-navbar-row">
            <div className='wiki-navbar-left'>
              <div className='wiki-navbar-text'>Dept: Computer Science</div>
            </div>
            <div className='wiki-navbar-middle'>
              <div className='wiki-other-year' >{this.props.prev}</div>
              <div className= 'wiki-arrow'>
                  <i className="fa fa-angle-double-left"></i>
              </div>
              <div className='wiki-year'>{this.props.current}</div>
              <div className= 'wiki-arrow'>
                    <i className="fa fa-angle-double-right"></i>
              </div>
              <div className='wiki-other-year' >{this.props.next}</div>
            </div>
            <div className='wiki-navbar-right'>
              <div className='wiki-navbar-signin'>
                  <button className='wiki-signin'>
                    <SignOutButton />
                  </button>
              </div>
            </div>
          </div>

          <div className="wiki-main">
            <div className='wiki-main-row'>
              <div className = "wiki-info-col" style = {{width: '100%'}}>
                <div className = 'wiki-info-wrapper'>
                  <div className = 'wiki-info-doc'>
                    <div className = 'wiki-info-title'>
                      Document Review
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Self Introduction</li>
                          { this.props.is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                          </ul>
                        </div>
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Extracurricular</li>
                          { this.props.is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                          </ul>
                        </div>
                      </ul>
                    </div>
                  </div>
                  <hr></hr>
                  <div className = 'wiki-info-interviews'>
                    <div className = 'wiki-info-title'>
                      Interview
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Programming Test</li>
                          { this.props.is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                          </ul>
                        </div>
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Waiting Room</li>
                          { this.props.is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                          </ul>
                        </div>
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Room 1</li>
                          { this.props.is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                          </ul>
                        </div>
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Room 2</li>
                          { this.props.is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                          </ul>
                        </div>
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Room 3</li>
                          { this.props.is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                          </ul>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  WikiTemplate.propTypes = {
    prev: PropTypes.string,
    current: PropTypes.string,
    next: PropTypes.string,
    is_editor: PropTypes.bool
  };