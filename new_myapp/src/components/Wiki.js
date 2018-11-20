import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import { firebase, db } from '../firebase';
import SignOutButton from './SignOut';
import UserInfo from './UserInfo';
import WikiTemplate from './WikiTemplate';
import RepliesList from './RepliesList';
import ReplyAdd from './ReplyAdd';

const INITIAL_STATE = {
  myid: '',
  myinfo: {},
  current : '19 Spring',
  prev: '18 Fall',
  next: '19 Fall',
  intros : [],
  extras : [],
  progs : [],
  waits : [],
  room1s : [],
  room2s : [],
  room3s : [],
  comment_que : 'none',
  comments : [],
  currentUser: null,
  displayUserInfo: false,
  ready : 0,
  topic_input: [false, false, false, false, false, false, false],
  new_topic : '',
  addreplycid : '',
};

class WikiPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.changeState = this.changeState.bind(this);
    this.changeNext = this.changeNext.bind(this);
    this.changePrev = this.changePrev.bind(this);
    this.showProfile = this.showProfile.bind(this);
    this.closeProfile = this.closeProfile.bind(this);
  }

  componentDidMount(){
    this.changeState();
  }

  closeComments(){
    this.setState({
      comment_que : 'none',
      comment_width : '100%',
      comment_display : 'none',
      topic_input: [false, false, false, false, false, false, false],
      new_topic : "",
    })
  }

  changeState(){
    this.setState({ ready: 0 });
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
    firebase.auth.onAuthStateChanged(authUser => {
      if (!authUser) {
        alert("You must log in!");
      }
      var myid = authUser.uid;
      var myself = db.getUser(myid);
      this.setState({ myid });
      myself.once("value").then(function(snapshot) {
        var myinfo = snapshot.val();
        var is_editor = (myinfo.admission_year === that.state.current)
        that.setState({ myinfo });
        introduction.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const qid = child.key;
            const {text, uid, visibility, vote,} = child.val();
            if (visibility || is_editor) {
              intros.push({qid, text, uid, visibility, vote,});
            }
          });
          that.setState({
            intros,
            ready : that.state.ready + 1
          });
        });
        extracurricular.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const qid = child.key;
            const {text, uid, visibility, vote,} = child.val();
            if (visibility || is_editor) {
              extras.push({qid, text, uid, visibility, vote,});
            }
          });
          that.setState({
            extras,
            ready : that.state.ready + 1
          });
        });
        programming.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const qid = child.key;
            const {text, uid, visibility, vote,} = child.val();
            if (visibility || is_editor) {
              progs.push({qid, text, uid, visibility, vote,});
            }
          });
          that.setState({
            progs,
            ready : that.state.ready + 1
          });
        });
        waiting.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const qid = child.key;
            const {text, uid, visibility, vote,} = child.val();
            if (visibility || is_editor) {
              waits.push({qid, text, uid, visibility, vote,});
            }
          });
          that.setState({
            waits,
            ready : that.state.ready + 1
          });
        });
        room1.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const qid = child.key;
            const {text, uid, visibility, vote,} = child.val();
            if (visibility || is_editor) {
              room1s.push({qid, text, uid, visibility, vote,});
            }
          });
          that.setState({
            room1s,
            ready : that.state.ready + 1
          });
        });
        room2.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const qid = child.key;
            const {text, uid, visibility, vote,} = child.val();
            if (visibility || is_editor) {
              room2s.push({qid, text, uid, visibility, vote,});
            }
          });
          that.setState({
            room2s,
            ready : that.state.ready + 1
          });
        });
        room3.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const qid = child.key;
            const {text, uid, visibility, vote,} = child.val();
            if (visibility || is_editor) {
              room3s.push({qid, text, uid, visibility, vote,});
            }
          });
          that.setState({
            room3s,
            ready : that.state.ready + 1
          });
        });
      });
    });
  }

  changeNext() {
    if (this.state.next.startsWith("20")) {
      return;
    }
    if (this.state.next.endsWith("Fall")) {
      var next = Number(this.state.next.slice(0,2));
      next = String(next + 1) + " Spring"; 
    } else {
      var next = this.state.next.replace("Spring", "Fall");
    }
    this.closeComments();
    this.setState({
      prev: this.state.current,
      current : this.state.next,
      next: next,
    }, () => {
      this.changeState();
    });
  }

  changePrev() {
    if (this.state.current.startsWith("17")) {
      return;
    }
    if (this.state.prev.endsWith("Spring")) {
      var prev = Number(this.state.prev.slice(0,2));
      prev = String(prev - 1) + " Fall"; 
    } else {
      var prev = this.state.prev.replace("Fall", "Spring");
    }
    this.closeComments();
    this.setState({
      prev: prev,
      current : this.state.prev,
      next: this.state.current
    }, () => {
      this.changeState();
    });
  }

  handleClick(question) {
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
      var all_comment = db.getComments(this.state.current, qid);
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

  clickAdd(topic_idx) {
    var init = [false, false, false, false, false, false, false];
    if (topic_idx !== -1 && !this.state.topic_input[topic_idx]) {
      init[topic_idx] = true;
    }
    this.setState({
      topic_input : init,
      new_topic : ""
    });

  }

  showProfile(uid) {
    var that = this;
    var user = db.getUser(uid);
    user.once("value").then(function(snapshot) {
      var myinfo = snapshot.val();
      that.setState({
        displayUserInfo: !that.state.displayUserInfo,
        user: myinfo,
      });
    })
  }

  toggleReply(uid) {
    if (this.state.addreplycid === uid) {
      this.setState({ addreplycid: '' });
    }
    else {
      this.setState({ addreplycid: uid });
    }
  }

  closeProfile() {
    this.setState({
      displayUserInfo: false,
      user: null,
    })
  }

  vote(fa, qid_path) {
    var that = this;
    var full_path = `${this.state.current}/${qid_path}`
    var question = db.getQuestion(full_path);
    question.once("value").then(function(snapshot) {
      var qinfo = snapshot.val();
      if (qinfo.vote[2] === '5') {
        alert("This topic has already been deleted.")
        this.changeState();
        return;
      }
      if (qinfo.vote[0] === '5') {
        alert("This topic has already been added.");
        this.changeState();
        return;
      }
      if (qinfo.votefor.includes(that.state.myid)) {
        alert("You have already voted for this topic!");
        return;
      }
      if (qinfo.voteagainst.includes(that.state.myid)) {
        alert("You have already voted against this topic!");
        return;
      }
      if (fa === 'f') {
        var newvote = (parseInt(qinfo.vote[0])+1).toString() + qinfo.vote.substr(1,3);
        var newvotefor = qinfo.votefor + " " + that.state.myid;
        var visib = qinfo.vote[0] === '4';
        db.doVote(full_path, newvote, newvotefor, qinfo.voteagainst, visib);
      }
      else {
        if (qinfo.vote[2] === '4') {
          db.removeQuestion(full_path);
          that.changeState();
          return;
        }
        var newvote = qinfo.vote.substr(0,2) + (parseInt(qinfo.vote[2])+1).toString();
        var newvoteagainst = qinfo.voteagainst + " " + that.state.myid;
        db.doVote(full_path, newvote, qinfo.votefor, newvoteagainst, qinfo.visibility);
      }
      that.changeState();
    })
  }

  parseQuestions(que, path, is_editor) {
    return <div className="wiki-info-item">
      <li onClick={(() => this.handleClick(que))}>{que.text}</li>
      { is_editor && !que.visibility && 
      <div className = 'vote-info'>
        <img className = 'agree' src={require('./images/agree.png')} onClick={(() => this.vote('f',`${path}/${que.qid}`))}/>
        <div className = 'agreeNum'>{que.vote[0]}</div>
        <div className = 'divide'>/</div>
        <div className = 'disagreeNum'>{que.vote[2]}</div>
        <img className = 'disagree' src={require('./images/disagree.png')} onClick={(() => this.vote('a',`${path}/${que.qid}`))}/> 
      </div>
      }
      </div>;
  }

  addTopic(path) {
    var that = this;
    var text = this.state.new_topic;
    if (text === '' || text.length < 5) {
      alert("Please type in a proper topic/question to talk about");
      return;
    }
    db.getQid(this.state.current).once("value").then(function(snapshot) {
      var base = snapshot.val();
      var qid = 1;
      if (base) {
        qid = base.qid;
      }
      db.incQid(that.state.current, qid+1);
      var full_path = `${that.state.current}/${path}/${qid}`;
      db.addQuestion(full_path, text, that.state.myid);
      that.clickAdd(-1);
      that.changeState();
    })
  }

  render() {
    const {
      myid,
      myinfo,
      current,
      intros,
      extras,
      progs,
      waits,
      room1s,
      room2s,
      room3s,
      comments,
      ready,
      topic_input,
    } = this.state;

    var is_editor = (myinfo.admission_year === current);
    
    if (ready < 7) {
      return <WikiTemplate prev={this.state.prev} current={this.state.current} next={this.state.next} is_editor={is_editor}/>
    }

    if (myid !== '') {
      var intro_questions = intros.map(function(que){
        return this.parseQuestions(que, 'Document/Introduction', is_editor);
      }, this);
      
      var extra_questions = extras.map(function(que){
        return this.parseQuestions(que, 'Document/Extracurricular', is_editor);
      }, this);
      
      var prog_questions = progs.map(function(que){
        return this.parseQuestions(que, 'Interview/Programming', is_editor);
      }, this);

      var wait_questions = waits.map(function(que){
        return this.parseQuestions(que, 'Interview/Waiting', is_editor);
      }, this);
      
      var room1_questions = room1s.map(function(que){
        return this.parseQuestions(que, 'Interview/Room1', is_editor);
      }, this);
      
      var room2_questions = room2s.map(function(que){
        return this.parseQuestions(que, 'Interview/Room2', is_editor);
      }, this);
      
      var room3_questions = room3s.map(function(que){
        return this.parseQuestions(que, 'Interview/Room3', is_editor);
      }, this);
    }

    if (this.state.comment_que != 'none') {
      var comment_list = comments.map(function(com){
        return <div className = 'wiki-comment-and-reply'>
          <div className = 'wiki-comment-user-box'>
            <div className = 'wiki-comment-user-row'>
              <div className = 'wiki-comment-user-col-left'>
                <img className = 'user-pic' src={require('./images/user.png')} onClick={((e) =>this.showProfile(com.uid))}/>
                <img className = 'reply-btn' src={require('./images/reply.png')} onClick={((e) =>this.toggleReply(com.uid))}/>
              </div>
              <div className = 'wiki-comment-user-col-right'>
                <div className = 'wiki-comment-user-context'>
                {com.text}
                </div>
              </div>
            </div>
          </div>

          <RepliesList reps={com.replies}/>
          { this.state.addreplycid === com.uid ? <ReplyAdd /> : null }

          <div className = 'wiki-comment-wrapper'>
            <div className = 'wiki-comment-user-box'>
              <div className = 'wiki-comment-addbox'>
                <input className = 'wiki-comment-input' type = 'text'></input>
                <button className = 'wiki-comment-addbutton' type="submit">
                  <div className = 'wiki-submit-text'>ADD</div>
                </button>
              </div>
            </div>
          </div>
          <div class="footer">
            <button class="new-comment-add-btn">Add a new comment</button> 
          </div>
        </div>;
      }, this);
    }
    else {
      console.log("here I am");
      var comment_list = <div class="footer">
      <button class="new-comment-add-btn">Add a new comment</button> 
    </div>;
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
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Self Introduction</li>
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(0))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                          { intro_questions }
                          </ul>
                        </div>
                        { topic_input[0] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Document/Introduction"))}>
                            <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Extracurricular</li>
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(1))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { extra_questions }
                          </ul>
                        </div>
                        { topic_input[1] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Document/Extracurricular"))}>
                            <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
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
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(2))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { prog_questions }
                          </ul>
                        </div>
                        { topic_input[2] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Interview/Programming"))}>
                            <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Waiting Room</li>
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(3))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { wait_questions }
                          </ul>
                        </div>
                        { topic_input[3] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Interview/Waiting"))}>
                            <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Room 1</li>
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(4))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { room1_questions }
                          </ul>
                        </div>
                        { topic_input[4] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Interview/Room1"))}>
                            <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Room 2</li>
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(5))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { room2_questions }
                          </ul>
                        </div>
                        { topic_input[5] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Interview/Room2"))}>
                            <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>Room 3</li>
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(6))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { room3_questions }
                          </ul>
                        </div>
                        { topic_input[6] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Interview/Room3"))}>
                           <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
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
                    { this.state.displayUserInfo 
                      ? <UserInfo show={this.state.displayUserInfo}
                           onClose={this.closeProfile} 
                           user={this.state.user}
                           />
                      : comment_list }
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
