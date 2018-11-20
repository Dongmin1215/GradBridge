import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebase, db } from '../firebase';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

const INITIAL_STATE = {
  text: '',
}

export default class RepliesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  addReply() {
    var text = this.state.text;
    var qid = this.props.qid;
    var cid = this.props.cid;
    var sem = this.props.sem;
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
      db.addReply(full_path, text);
    })
  }

  render() {
    return (
      <div className='wiki-reply-wrapper'>
        <div className = 'wiki-reply-tri-wrapper'>
          <div className = 'wiki-reply-tri'>
          </div>
        </div>
        <div className = 'wiki-reply-input-box'> 
          <div className = 'wiki-reply-add'>
            <input className = 'wiki-reply-input' type = 'text' onChange={e => this.setState({ text: e.target.value })}></input>
            <button className = 'wiki-reply-addbutton' type="submit" onClick={(() => this.addReply())}>
              <div className = 'wiki-submit-text'>ADD</div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

RepliesList.propTypes = {
  cid: PropTypes.number,
  qid: PropTypes.number,
  sem: PropTypes.string,
};