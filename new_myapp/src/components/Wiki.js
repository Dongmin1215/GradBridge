import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import { db } from '../firebase';
import SignOutButton from './SignOut';
import UserInfo from './UserInfo';

const INITIAL_STATE = {
  current : '19 spring',
  prev: '18 fall',
  next: '19 fall',
  intros : [],
  extras : [],
  progs : [],
  waits : [],
  room1s : [],
  room2s : [],
  room3s : [],
  comment_que : 'none',
  comments : [],
  displayUserInfo: false
};

class WikiPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.changeState = this.changeState.bind(this);
    this.changeNext = this.changeNext.bind(this);
    this.changePrev = this.changePrev.bind(this);
  }

  componentDidMount(){
    this.changeState();
  }

  changeState(){
    const intros = []
    const extras = []
    const progs = []
    const waits = []
    const room1s = []
    const room2s = []
    const room3s = []
    var introduction = db.getIntroduction(this.state.current);
    var extracurricular = db.getExtracurricular(this.state.current);
    var programming = db.getProgramming(this.state.current);
    var waiting = db.getWaiting(this.state.current);
    var room1 = db.getRoom1(this.state.current);
    var room2 = db.getRoom2(this.state.current);
    var room3 = db.getRoom3(this.state.current);
    var that = this;
    introduction.once("value").then(function(snapshot) {
      snapshot.forEach(function(child) {
        const qid = child.key;
        const {text, uid, visibility, vote} = child.val();
        intros.push({
          qid,
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
        const qid = child.key;
        const {text, uid, visibility, vote} = child.val();
        extras.push({
          qid,
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
        const qid = child.key;
        const {text, uid, visibility, vote} = child.val();
        progs.push({
          qid,
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
        const qid = child.key;
        const {text, uid, visibility, vote} = child.val();
        waits.push({
          qid,
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
        const qid = child.key;
        const {text, uid, visibility, vote} = child.val();
        room1s.push({
          qid,
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
        const qid = child.key;
        const {text, uid, visibility, vote} = child.val();
        room2s.push({
          qid,
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
        const qid = child.key;
        const {text, uid, visibility, vote} = child.val();
        room3s.push({
          qid,
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

  changeNext() {
    if (this.state.next.endsWith("fall")) {
      var next = Number(this.state.next.slice(0,2));
      next = String(next + 1) + " spring"; 
    } else {
      var next = this.state.next.replace("spring", "fall");
    }
    this.setState({
      prev: this.state.current,
      current : this.state.next,
      next: next,
    }, () => {
      this.changeState();
    });
  }

  changePrev() {
    if (this.state.prev.endsWith("spring")) {
      var prev = Number(this.state.prev.slice(0,2));
      prev = String(prev - 1) + " fall"; 
    } else {
      var prev = this.state.prev.replace("fall", "spring");
    }
    this.setState({
      prev: prev,
      current : this.state.prev,
      next: this.state.current
    }, () => {
      this.changeState();
    });
  }

  handleClick(e, question) {
    var qid = question.qid
    if (this.state.comment_que === qid) {
      this.setState({
        comment_que: 'none',
        comment_display: 'none',
        comment_width: '100%',
      });
      this.setState({
        comments: []
      });
    }
    else {
      this.setState({
        comment_que: qid,
        comment_display: '-webkit-box',
        comment_width: '65%',
      });
      const comments = []
      var all_comment = db.getComments(qid);
      var that = this;
      all_comment.once("value").then(function(snapshot) {
        snapshot.forEach(function(child) {
          const cid = child.key;
          const {gpa, kaist, major, replies, text, uid} = child.val();
          comments.push({
            cid,
            text,
            uid,
            gpa,
            kaist,
            major,
            replies,
          });
        });
        that.setState({
          comments
        });
      });
    }
  }

  showDialog = () => {
    this.setState({
      displayUserInfo: !this.state.displayUserInfo
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
      comments,
    } = this.state;
    
    var intro_questions = intros.map(function(que){
      return <div className="wiki-info-item"><li onClick={((e) => this.handleClick(e, que))}>{que.text}</li></div>;
    }, this);
    
    var extra_questions = extras.map(function(que){
      return <div className="wiki-info-item"><li onClick={((e) => this.handleClick(e, que))}>{que.text}</li></div>;
    }, this);
    
    var prog_questions = progs.map(function(que){
      return <div className="wiki-info-item"><li onClick={((e) => this.handleClick(e, que))}>{que.text}</li></div>;
    }, this);

    var wait_questions = waits.map(function(que){
      return <div className="wiki-info-item"><li onClick={((e) => this.handleClick(e, que))}>{que.text}</li></div>;
    }, this);
    
    var room1_questions = room1s.map(function(que){
      return <div className="wiki-info-item"><li onClick={((e) => this.handleClick(e, que))}>{que.text}</li></div>;
    }, this);
    
    var room2_questions = room2s.map(function(que){
      return <div className="wiki-info-item"><li onClick={((e) => this.handleClick(e, que))}>{que.text}</li></div>;
    }, this);
    
    var room3_questions = room3s.map(function(que){
      return <div className="wiki-info-item"><li onClick={((e) => this.handleClick(e, que))}>{que.text}</li></div>;
    }, this);

    if (this.state.comment_que != 'none') {
      var comment_list = comments.map(function(com){
        return <div className = 'wiki-comment-and-reply'>
          <div className = 'wiki-comment-user-box'>
            <div className = 'wiki-comment-user-row'>
              <div className = 'wiki-comment-user-col-left'>
                <img className = 'user-pic' src={require('./images/user.png')} onClick={this.showDialog}/>
                <UserInfo show={this.state.isOpen}
                  onClose={this.showDialog}>
                  Here's some content for the modal
                </UserInfo>
              </div>
              <div className = 'wiki-comment-user-col-right'>
                <div className = 'wiki-comment-user-context'>
                {com.text}
                </div>
              </div>
            </div>
          </div>
          <div className='wiki-reply-wrapper'>
            <div className = 'wiki-reply-tri-wrapper'>
              <div className = 'wiki-reply-tri'>
              </div>
            </div>
            <div className = 'wiki-reply-box'>
              <div className = 'wiki-reply-context'>
              How did you implement page table in the pintos project?How did you implement page table in the pintos project?How did you implement page table in the pintos project?How did you implement page table in the pintos project?How did you implement page table in the pintos project?How did you implement page table in the pintos project?How did you implement page table in the pintos project?How did you implement page table in the pintos project?How did you implement page table in the pintos project?How did you implement page table in the pintos project?
              </div>
            </div>
          </div>
        </div>;
      }, this);
    }

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
              <div className='wiki-other-year' onClick={this.changePrev}>{this.state.prev}</div>
              <div className= 'wiki-arrow'>
                  <i className="fa fa-angle-double-left"></i>
              </div>
              <div className='wiki-year'>{this.state.current}</div>
              <div className= 'wiki-arrow'>
                    <i className="fa fa-angle-double-right"></i>
              </div>
              <div className='wiki-other-year' onClick={this.changeNext}>{this.state.next}</div>
            </div>
            <div className='wiki-navbar-right'>
              <div className='wiki-navbar-signin'>
                <Link to={routes.LANDING}>
                  <button className='wiki-signin'>
                    <SignOutButton />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="wiki-main">
            <div className='wiki-main-row'>
              <div className = "wiki-info-col" style = {{width: this.state.comment_width}}>
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

              <div className='wiki-comment-col' style={{display:this.state.comment_display}}>
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
                    { comment_list }
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
