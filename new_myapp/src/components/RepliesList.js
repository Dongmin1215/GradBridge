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
      return (
        <div className='wiki-reply-wrapper'>
          <div className = 'wiki-reply-tri-wrapper'>
            <div className = 'wiki-reply-tri'>
            </div>
          </div>
          <div className = 'wiki-reply-box'>
            <div className = 'wiki-reply-context'>
            {rep.text}
            </div>
          </div>
        </div>
      )
    }, this);
    return all_replies;
  }
}

RepliesList.propTypes = {
  reps: PropTypes.array
};