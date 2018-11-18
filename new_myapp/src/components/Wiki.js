import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import { db } from '../firebase';


const INITIAL_STATE = {
  intros : [],
  extras : [],
  progs : [],
  waits : [],
  room1s : [],
  room2s : [],
  room3s : [],
};

class WikiPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount(){
    const intros = []
    const extras = []
    const progs = []
    const waits = []
    const room1s = []
    const room2s = []
    const room3s = []
    var introduction = db.getIntroduction('19s');
    var extracurricular = db.getExtracurricular('19s');
    var programming = db.getProgramming('19s');
    var waiting = db.getWaiting('19s');
    var room1 = db.getRoom1('19s');
    var room2 = db.getRoom2('19s');
    var room3 = db.getRoom3('19s');
    var that = this;
    introduction.once("value").then(function(snapshot) {
      snapshot.forEach(function(child) {
        const {text, uid, visibility, vote} = child.val();
        intros.push({
          text,
          uid,
          visibility,
          vote
        });
      });
      that.setState({
        intros
      });
    });
    extracurricular.once("value").then(function(snapshot) {
      snapshot.forEach(function(child) {
        const {text, uid, visibility, vote} = child.val();
        extras.push({
          text,
          uid,
          visibility,
          vote
        });
      });
      that.setState({
        extras
      });
    });
    programming.once("value").then(function(snapshot) {
      snapshot.forEach(function(child) {
        const {text, uid, visibility, vote} = child.val();
        progs.push({
          text,
          uid,
          visibility,
          vote
        });
      });
      that.setState({
        progs
      });
    });
    waiting.once("value").then(function(snapshot) {
      snapshot.forEach(function(child) {
        const {text, uid, visibility, vote} = child.val();
        waits.push({
          text,
          uid,
          visibility,
          vote
        });
      });
      that.setState({
        waits
      });
    });
    room1.once("value").then(function(snapshot) {
      snapshot.forEach(function(child) {
        const {text, uid, visibility, vote} = child.val();
        room1s.push({
          text,
          uid,
          visibility,
          vote
        });
      });
      that.setState({
        room1s
      });
    });
    room2.once("value").then(function(snapshot) {
      snapshot.forEach(function(child) {
        const {text, uid, visibility, vote} = child.val();
        room2s.push({
          text,
          uid,
          visibility,
          vote
        });
      });
      that.setState({
        room2s
      });
    });
    room3.once("value").then(function(snapshot) {
      snapshot.forEach(function(child) {
        const {text, uid, visibility, vote} = child.val();
        room3s.push({
          text,
          uid,
          visibility,
          vote
        });
      });
      that.setState({
        room3s
      });
    });
  }

  render() {
    const {
      intros,
      extras,
      progs,
      waits,
      room1s,
      room2s,
      room3s,
    } = this.state;

    console.log(intros);
    
    var intro_questions = intros.map(function(que){
        return <li>{que.text}</li>;
    });
    
    var extra_questions = extras.map(function(que){
      return <li>{que.text}</li>;
    });
    
    var prog_questions = progs.map(function(que){
      return <li>{que.text}</li>;
    });

    var wait_questions = waits.map(function(que){
      return <li>{que.text}</li>;
    });
    
    var room1_questions = room1s.map(function(que){
      return <li>{que.text}</li>;
    });
    
    var room2_questions = room2s.map(function(que){
      return <li>{que.text}</li>;
    });
    
    var room3_questions = room3s.map(function(que){
      return <li>{que.text}</li>;
    });

    return (
      <div className='wiki'>
          <div className = "top">
            <div className="Title">
                <Link to={routes.LANDING}>
              <img id="top-logo" src={require('./images/logo.png')}/>
                </Link>
            </div>
          </div>

          <div className="wiki-navbar-row">
            <div className='wiki-navbar-left'>
              <div className='wiki-navbar-text'>Dept: Computer Science</div>
            </div>
            <div className='wiki-navbar-middle'>
              <div className='wiki-other-year'>2018 Fall</div>
              <div className= 'wiki-arrow'>
                  <i className="fa fa-angle-double-left"></i>
              </div>
              <div className='wiki-year'>2019 Spring</div>
              <div className= 'wiki-arrow'>
                    <i className="fa fa-angle-double-right"></i>
              </div>
              <div className='wiki-other-year'>2019 Fall</div>
            </div>
            <div className='wiki-navbar-right'>
              <div className='wiki-navbar-signin'>
                <Link to={routes.LANDING}>
                  <button className='wiki-signin'>
                    <div id='wiki-signin-text'>Log out</div>
                  </button>
                </Link>
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
                          { intro_questions }
                          </ul>
                        </div>
                      </ul>
                    </div>

                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <li>Extracurricular</li>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { extra_questions }
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
                        <li>Programming Test</li>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { prog_questions }
                          </ul>
                        </div>
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <li>Waiting room</li>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { wait_questions }
                          </ul>
                        </div>
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <li>Room 1</li>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { room1_questions }
                          </ul>
                        </div>
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <li>Room 2</li>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { room2_questions }
                          </ul>
                        </div>
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <li>Room 3</li>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { room3_questions }
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
                              <option>under. univeristy</option>
                              <option>KAIST</option>
                              <option>Others</option>
                            </select>
                          </div>
                      </div>

                      <div className ='wiki-comment-filter-col'>
                        <div className = 'wiki-comment-filter-wrapper'>
                          <select className = "wiki-comment-filter-select">
                            <option>under. major</option>
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
    );
  }
}

export default WikiPage;
