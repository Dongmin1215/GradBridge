import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

export default class RepliesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.reps) {
      return null;
    }
    var all_replies = this.props.reps.map(function(rep){
      var tag = (rep.type == 'editor' ? "Editor" : "Visitor");
      tag = (rep.uid == this.props.uid ? "Me" : tag);
      return (
        <div className = 'wiki-reply-wrapper'>
          <div className = 'wiki-reply-tri-wrapper'>
            <div className = 'wiki-reply-tri'>
            </div>
          </div>
          <div className = 'wiki-reply-box'>
            <div className = 'wiki-reply-context'>
            <p className = 'wiki-reply-tag'>{tag}</p>{": " + rep.text}
            </div>
          </div>
        </div>
      )
    }, this);
    return all_replies;
  }
}

RepliesList.propTypes = {
  reps: PropTypes.array,
  uid: PropTypes.string
};