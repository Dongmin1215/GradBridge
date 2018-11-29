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
            <div className = "wiki-title">
                <div className = "wiki-void">
                </div>
                <div className = "wiki-middle-top">
                  <img id = "wiki-top-logo" src={require('./images/logo.png')}/>
                </div>
                <div className = "wiki-user-info">
                  <div className = "wiki-user-info-text">
                    {this.props.email == null ? "yourEmail@email.com" : this.props.email}
                  </div>
                  <div className = "wiki-user-info-text">
                    점수: {this.props.points == null ? "00" : this.props.points} pts
                  </div>
                </div>
            </div>
          </div>
          <div className="wiki-navbar-row">
            <div className='wiki-navbar-left'>
              <div className='wiki-navbar-text'>학과: 전산학과</div>
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
                      서류
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>자기소개서</li>
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
                          <li>우수성 입증 자료</li>
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
                          <li>기타</li>
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
                      면접
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>프로그래밍 시험</li>
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
                          <li>면접</li>
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
                          <li>기타</li>
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
    is_editor: PropTypes.bool,
    email: PropTypes.string,
    points: PropTypes.number
  };