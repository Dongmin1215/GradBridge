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

const INITIAL_STATE = {
  myid: '',
  myinfo: {},
  current : '19 Spring',
  prev: '18 Fall',
  next: '19 Fall',
  intros : [],
  extras : [],
  other1s : [],
  progs : [],
  inters : [],
  other2s : [],
  comment_que : 'none',
  comments : [],
  currentUser: null,
  displayUserInfo: false,
  ready : 0,
  topic_input: [false, false, false, false, false, false],
  new_topic : "",
  prevShow : true,
  nextShow : true,
  addreplycid : "",
  gpa_option: "default",
  univ_option: "default",
  major_option: "default",
  new_comment : "",
  new_reply : "",
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
    this.changeGpaOption = this.changeGpaOption.bind(this);
    this.changeUnivOption = this.changeUnivOption.bind(this);
    this.changeMajorOption = this.changeMajorOption.bind(this);
  }

  componentDidMount(){
    this.changeState();
  }

  closeComments(){
    this.setState({
      comment_que : 'none',
      comment_width : '100%',
      comment_display : 'none',
      topic_input: [false, false, false, false, false, false],
      new_topic : "",
    })
  }

  changeState(){
    this.setState({ ready: 0 });
    const intros = []
    const extras = []
    const other1s = []
    const progs = []
    const inters = []
    const other2s = []
    var introduction = db.getIntroduction(this.state.current);
    var extracurricular = db.getExtracurricular(this.state.current);
    var othertopic1 = db.getOther1(this.state.current);
    var programming = db.getProgramming(this.state.current);
    var interview = db.getInterview(this.state.current);
    var othertopic2 = db.getOther2(this.state.current);
    var that = this;
    firebase.auth.onAuthStateChanged(authUser => {
      if (!authUser) {
        alert("로그인 하세요");
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
        othertopic1.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const qid = child.key;
            const {text, uid, visibility, vote,} = child.val();
            if (visibility || is_editor) {
              other1s.push({qid, text, uid, visibility, vote,});
            }
          });
          that.setState({
            other1s,
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
        interview.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const qid = child.key;
            const {text, uid, visibility, vote,} = child.val();
            if (visibility || is_editor) {
              inters.push({qid, text, uid, visibility, vote,});
            }
          });
          that.setState({
            inters,
            ready : that.state.ready + 1
          });
        });
        othertopic2.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const qid = child.key;
            const {text, uid, visibility, vote,} = child.val();
            if (visibility || is_editor) {
              other2s.push({qid, text, uid, visibility, vote,});
            }
          });
          that.setState({
            other2s,
            ready : that.state.ready + 1
          });
        });
      });
    });
  }

  changeNext() {
    if (this.state.next.startsWith("20")) {
      this.setState({
        nextShow : false,
        prev: this.state.current,
        current : this.state.next,
      });
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
      prevShow : true,
    }, () => {
      this.changeState();
    });
  }

  changePrev() {
    if (this.state.prev.startsWith("15 Spring")) {
      this.setState({
        prevShow : false,
        current : this.state.prev,
        next: this.state.current
      });
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
      next: this.state.current,
      nextShow : true
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
        togglecomment: false,
        gpa_option: 'default',
        univ_option: 'default',
        major_option: 'default',
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
        togglecomment: false,
      });
      const comments = []
      var all_comment = db.getComments(this.state.current, qid);
      var that = this;
      all_comment.once("value").then(function(snapshot) {
        snapshot.forEach(function(child) {
          const cid = child.key;
          const {gpa, kaist, major, replies, text, uid} = child.val();
          if (that.state.gpa_option != "default") {
            if (that.state.gpa_option != gpa) {
              return;
            }
          }
          if (that.state.univ_option != "default") {
            if (that.state.univ_option != kaist.toString()) {
              return;
            }
          }
          if (that.state.major_option != "default") {
            if (that.state.major_option != major) {
              return;
            }
          }
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
    var init = [false, false, false, false, false, false];
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
    if (this.state.addreplycid === uid || uid == -1) {
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
    var va = "Do you want to vote against this topic?\nOnce it reaches 3 votes it will be removed and not get confirmed as a proper topic.";
    var vf = "Do you want to vote for this topic?\nOnce it reaches 3 votes it will be confirmed as a proper topic that everyone can see.";
    var vote_confirm = (fa == "f" ? vf : va);
    if (!window.confirm(vote_confirm)) {
      return;
    }
    var that = this;
    var full_path = `${this.state.current}/${qid_path}`
    var question = db.getQuestion(full_path);
    question.once("value").then(function(snapshot) {
      var qinfo = snapshot.val();
      if (qinfo.vote[2] === '3') {
        alert("This topic has already been deleted.")
        this.changeState();
        return;
      }
      if (qinfo.vote[0] === '3') {
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
        var visib = false;
        if (qinfo.vote[0] === '2') {
          visib = true;
          db.getPoints(qinfo.uid).once("value").then(function(snapshot) {
            var points = snapshot.val();
            db.updatePoints(qinfo.uid, points+20);
          })
        }
        db.doVote(full_path, newvote, newvotefor, qinfo.voteagainst, visib);
      }
      else {
        if (qinfo.vote[2] === '2') {
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
      
      { (!is_editor || que.visibility) &&
       <li onClick={(() => this.handleClick(que))}>{que.text}</li>
      }
      { is_editor && !que.visibility && 
      <div className = 'wiki-info-que-wrapper'>
        <li className = 'wiki-info-que'onClick={(() => this.handleClick(que))}>{que.text}</li>
        <div className = 'vote-info'>
          <img className = 'agree' src={require('./images/agree.png')} onClick={(() => this.vote('f',`${path}/${que.qid}`))}/>
          <div className = 'agreeNum'>{que.vote[0]}</div>
          <div className = 'divide'>/</div>
          <div className = 'disagreeNum'>{que.vote[2]}</div>
          <img className = 'disagree' src={require('./images/disagree.png')} onClick={(() => this.vote('a',`${path}/${que.qid}`))}/> 
        </div>
        </div>
      }
      </div>;
  }

  addReply(cid, qid, sem) {
    var that = this;
    var text = this.state.new_reply;
    if (text === '' || text.length < 5) {
      alert("Please type in a proper topic/question to talk about");
      return;
    }
    db.getRid(sem, qid, cid).once("value").then(function(snapshot) {
      var base = snapshot.val();
      var rid = 1;
      if (base) {
        rid = base.base_rid;
      }
      db.incRid(sem, qid, cid, rid+1);
      var full_path = `${sem}/${qid}/comments/${cid}/replies/${rid}`;
      var type = (that.state.myinfo.admission_year == that.state.current ? "editor" : "visitor")
      db.addReply(full_path, text, that.state.myid, type);
      that.closeComments();
      that.setState({ togglecomment: false });
      that.toggleReply(-1);
      that.changeState();
    })
  }

  addComment() {
    var that = this;
    var text = this.state.new_comment;
    var qid = this.state.comment_que;
    var info = this.state.myinfo;
    var sem = this.state.current
    var points = this.state.myinfo.points + 10;
    if (text === '' || text.length < 4) {
      alert("Please type in a proper topic/question to talk about");
      return;
    }
    db.getCid(sem, qid).once("value").then(function(snapshot) {
      var base = snapshot.val();
      var cid = 1;
      if (base) {
        cid = base.base_cid;
      }
      db.incCid(sem, qid, cid+1);
      var full_path = `${sem}/${qid}/comments/${cid}`;
      db.addComment(full_path, text, that.state.myid, info.gpa, info.under_uni === 'kaist', info.under_major);
      db.updatePoints(that.state.myid, points);
      that.closeComments();
      that.setState({ togglecomment: false });
      that.changeState();
    })
  }

  addTopic(path) {
    var that = this;
    var text = this.state.new_topic;
    if (text === '' || text.length < 2) {
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

  changeGpaOption(e) {
    var that = this;
    this.setState({gpa_option: e.target.value}, 
      () => {
        const comments = []
        var all_comment = db.getComments(that.state.current, that.state.comment_que);
        all_comment.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const cid = child.key;
            const {gpa, kaist, major, replies, text, uid} = child.val();
            if (that.state.gpa_option != "default") {
              if (that.state.gpa_option != gpa) {
                return;
              }
            }
            if (that.state.univ_option != "default") {
              if (that.state.univ_option != kaist.toString()) {
                return;
              }
            }
            if (that.state.major_option != "default") {
              if (that.state.major_option != major) {
                return;
              }
            }
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
      });
  }

  changeMajorOption(e) {
    var that = this;
    this.setState({major_option: e.target.value},
      () => {
        const comments = []
        var all_comment = db.getComments(that.state.current, that.state.comment_que);
        all_comment.once("value").then(function(snapshot) {
          snapshot.forEach(function(child) {
            const cid = child.key;
            const {gpa, kaist, major, replies, text, uid} = child.val();
            if (that.state.gpa_option != "default") {
              if (that.state.gpa_option != gpa) {
                return;
              }
            }
            if (that.state.univ_option != "default") {
              if (that.state.univ_option != kaist.toString()) {
                return;
              }
            }
            if (that.state.major_option != "default") {
              if (that.state.major_option != major) {
                return;
              }
            }
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
      });
  }

  changeUnivOption(e) {
  var that = this;
    this.setState({univ_option: e.target.value},
      () => {
      const comments = []
      var all_comment = db.getComments(that.state.current, that.state.comment_que);
      all_comment.once("value").then(function(snapshot) {
        snapshot.forEach(function(child) {
          const cid = child.key;
          const {gpa, kaist, major, replies, text, uid} = child.val();
          if (that.state.gpa_option != "default") {
            if (that.state.gpa_option != gpa) {
              return;
            }
          }
          if (that.state.univ_option != "default") {
            if (that.state.univ_option != kaist.toString()) {
              return;
            }
          }
          if (that.state.major_option != "default") {
            if (that.state.major_option != major) {
              return;
            }
          }
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
    });
  }
 
  reportComment(comment) {
    if (window.confirm("Do you want to report this comment to the admin?\nIf the admin accepts, the writer of this comment will lose 150pts.\nIf the admin decides this is a false report you may lose 20pts.")) {
      db.reportComment(this.state.current,this.state.comment_que,comment.cid);
      alert("You have reported this comment to the admin.");
    }
  }

  render() {
    const {
      myid,
      myinfo,
      current,
      intros,
      extras,
      other1s,
      progs,
      inters,
      other2s,
      comments,
      ready,
      topic_input,
    } = this.state;

    var is_editor = (myinfo.admission_year === current);
    
    if (ready < 6) {
      return <WikiTemplate prev={this.state.prev} current={current} next={this.state.next} is_editor={is_editor} points={myinfo.points} email={myinfo.email}/>
    }

    if (myid !== '') {
      var intro_questions = intros.map(function(que){
        return this.parseQuestions(que, 'Document/Introduction', is_editor);
      }, this);
      
      var extra_questions = extras.map(function(que){
        return this.parseQuestions(que, 'Document/Extracurricular', is_editor);
      }, this);
      
      var other1_questions = other1s.map(function(que){
        return this.parseQuestions(que, 'Document/Other', is_editor);
      }, this);

      var prog_questions = progs.map(function(que){
        return this.parseQuestions(que, 'Interview/Programming', is_editor);
      }, this);

      var inter_questions = inters.map(function(que){
        return this.parseQuestions(que, 'Interview/Interview', is_editor);
      }, this);
      
      var other2_questions = other2s.map(function(que){
        return this.parseQuestions(que, 'Interview/Other', is_editor);
      }, this);
    }

    if (this.state.comment_que != 'none') {
      var comment_list = comments.map(function(com){
        return <div className = 'wiki-comment-and-reply'>
          <div className = 'wiki-comment-user-box'>
            <div className = 'wiki-comment-user-row'>
              <div className = 'wiki-comment-user-col-left'>
                <img className = 'user-pic' src={require('./images/user.png')} onClick={((e) =>this.showProfile(com.uid))}/>
                <div className = 'reply-icons'>
                  <img className = 'reply-alarm' src={require('./images/alarm.png')} onClick={((e) =>this.reportComment(com))}/>
                  <img className = 'reply-btn' src={require('./images/reply.png')} onClick={((e) =>this.toggleReply(com.cid))}/>
                </div>
              </div>
              <div className = 'wiki-comment-user-col-right'>
                <div className = 'wiki-comment-user-context'>
                {com.text}
                </div>
              </div>
            </div>
          </div>

          <RepliesList reps={com.replies} uid={myid}/>
          { this.state.addreplycid === com.cid ? 
          <div className='wiki-reply-wrapper'>
            <div className = 'wiki-reply-tri-wrapper'>
              <div className = 'wiki-reply-tri'>
              </div>
            </div>
            <div className = 'wiki-reply-input-box'> 
              <div className = 'wiki-reply-add'>
                <input className = 'wiki-reply-input' type = 'text' placeholder = '답글을 달아 대화를 이어나가세요!' onChange={e => this.setState({ new_reply: e.target.value })}></input>
                <button className = 'wiki-reply-addbutton' type="submit" onClick={(() => this.addReply(com.cid, this.state.comment_que, current))}>
                  <div className = 'wiki-submit-text'>ADD</div>
                </button>
              </div>
            </div>
          </div>
          : null }
        </div>;
      }, this);
    }

    return (
      <div className='wiki'>
          <div className = "top">
            <div className = "wiki-title">
                <div className = "wiki-void">
                  <Link to = {routes.TUTORIAL}>
                    <div className = "wiki-tutorial">어떻게 이용하나요?</div>
                  </Link>
                </div>
                <div className = "wiki-middle-top">
                  <Link to = {routes.LANDING}>
                    <img id = "wiki-top-logo" src={require('./images/logo.png')}/>
                  </Link>
                </div>
                <div className = "wiki-user-info">
                  <div className = "wiki-user-info-text">
                    {myinfo.email}
                  </div>
                  <Link to = {routes.RANKING}>
                    {myinfo.points != undefined ?
                    <div className = "wiki-user-info-text">
                      점수: {myinfo.points} pts
                    </div> :
                    <div className = "wiki-user-info-text">
                      랭킹
                    </div>}
                  </Link>
                </div>
            </div>
          </div>
          <div className="wiki-navbar-row">
            <div className='wiki-navbar-left'>
              <div className='wiki-navbar-text'> 전산학과</div>
            </div>
            <div className='wiki-navbar-middle'>
              { this.state.prevShow && <div className='wiki-other-year' onClick={this.changePrev}>{this.state.prev}</div>}
              { this.state.prevShow && <div className= 'wiki-arrow'>
                  <i className="fa fa-angle-double-left"></i>
              </div>}
              <div className='wiki-year'>{current}</div>
              { this.state.nextShow && <div className= 'wiki-arrow'>
                    <i className="fa fa-angle-double-right"></i>
              </div> }
              { this.state.nextShow && <div className='wiki-other-year' onClick={this.changeNext}>{this.state.next}</div> }
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
                      서류
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>자기소개서</li>
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(0))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                          { intro_questions }
                          </ul>
                        </div>
                        { topic_input[0] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' placeholder = '토픽을 추가하세요! 3개의 투표를 얻으면 등록이 되고 20포인트를 얻습니다' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Document/Introduction"))}>
                            <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>우수성 입증 자료</li>
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(1))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { extra_questions }
                          </ul>
                        </div>
                        { topic_input[1] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' placeholder = '토픽을 추가하세요! 3개의 투표를 얻으면 등록이 되고 20포인트를 얻습니다' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Document/Extracurricular"))}>
                            <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>기타</li>
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(2))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { other1_questions }
                          </ul>
                        </div>
                        { topic_input[2] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' placeholder = '토픽을 추가하세요! 3개의 투표를 얻으면 등록이 되고 20포인트를 얻습니다' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Document/Other"))}>
                            <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
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
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(3))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { prog_questions }
                          </ul>
                        </div>
                        { topic_input[3] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' placeholder = '토픽을 추가하세요! 3개의 투표를 얻으면 등록이 되고 20포인트를 얻습니다' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Interview/Programming"))}>
                            <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>면접</li>
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(4))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { inter_questions }
                          </ul>
                        </div>
                        { topic_input[4] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' placeholder = '토픽을 추가하세요! 3개의 투표를 얻으면 등록이 되고 20포인트를 얻습니다' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Interview/Interview"))}>
                            <div className = 'wiki-submit-text'>ADD</div>
                          </button>
                        </div> }
                      </ul>
                    </div>
                    <div className = 'wiki-info-subtitle'>
                      <ul>
                        <div className = 'wiki-info-subtitle-editor'>
                          <li>기타</li>
                          { is_editor && <img className = 'wiki-info-subtitle-addimg' src={require('./images/add2.png')} onClick={(() => this.clickAdd(5))}/> }
                        </div>
                        <div className = 'wiki-info-qid'>
                          <ul>
                            { other2_questions }
                          </ul>
                        </div>
                        { topic_input[5] && <div className = 'wiki-info-add'>
                          <input className = 'wiki-info-inputbox'type = 'text' placeholder = '토픽을 추가하세요! 3개의 투표를 얻으면 등록이 되고 20포인트를 얻습니다' onChange={event => this.setState({ new_topic: event.target.value })}></input>
                          <button className = 'wiki-info-submit' type="submit" onClick={(() => this.addTopic("Interview/Other"))}>
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
                            <select className = "wiki-comment-filter-select" value={this.state.univ_option} onChange={this.changeUnivOption}>
                              <option value="default">출신 대학</option>
                              <option value="true">카이스트</option>
                              <option value="false">기타</option>
                            </select>
                          </div>
                      </div>
                      <div className ='wiki-comment-filter-col'>
                        <div className = 'wiki-comment-filter-wrapper'>
                          <select className = "wiki-comment-filter-select" value={this.state.major_option} onChange={this.changeMajorOption}>
                            <option value="default">전공</option>
                            <option value="cs">CS</option>
                            <option value="ee">EE</option>
                            <option value="me">ME</option>
                            <option value="cbe">CBE</option>
                            <option value="bs">BS</option>
                            <option value="ch">CH</option>
                            <option value="ms">MS</option>
                            <option value="py">PH</option>
                            <option value="ae">AE</option>
                            <option value="bb">BB</option>
                            <option value="cee">CEE</option>
                            <option value="id">ID</option>
                            <option value="ie">IE</option>
                            <option value="nqe">NQE</option>
                          </select>
                        </div>
                      </div>
                      <div className ='wiki-comment-filter-col'>
                        <div className = 'wiki-comment-filter-wrapper'>
                          <select className = "wiki-comment-filter-select" value={this.state.gpa_option} onChange={this.changeGpaOption}>
                            <option value="default">GPA</option>
                            <option value="0.0">0.0 ~ 2.5</option>
                            <option value="2.5">2.5 ~ 3.0</option>
                            <option value="3.0">3.0 ~ 3.5</option>
                            <option value="3.5">3.5 ~ 4.0</option>
                            <option value="4.0">4.0 ~ 4.3</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  { !this.state.displayUserInfo && is_editor &&
                  <div id = 'wiki-comment-add-top'>
                    <button className="new-comment-add-btn" onClick={((e) =>this.setState(p => ({togglecomment: !p.togglecomment})))}>새로운 댓글 추가하기</button>  
                  </div> }
                  { this.state.togglecomment && 
                    <div className = 'wiki-comment-user'>
                      <div className = 'wiki-comment-addbox'>
                        <input className = 'wiki-comment-input' type = 'text' placeholder = '경험을 공유하고 10포인트를 얻으세요!' onChange={event => this.setState({ new_comment: event.target.value })}></input>
                        <button className = 'wiki-comment-addbutton' type="submit" onClick={(() => this.addComment())}>
                          <div className = 'wiki-submit-text'>ADD</div>
                        </button>
                      </div>
                    </div>}
                  <div className = 'wiki-comment-user'>
                    { this.state.displayUserInfo 
                      ? <UserInfo show={this.state.displayUserInfo}
                           onClose={this.closeProfile} 
                           user={this.state.user}
                           />
                      :
                      comment_list }
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
