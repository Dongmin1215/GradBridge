import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

export default class RepliesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
        <div className='wiki-reply-wrapper'>
          <div className = 'wiki-reply-tri-wrapper'>
            <div className = 'wiki-reply-tri'>
            </div>
          </div>
          <div className = 'wiki-reply-box'>
            <div className = 'wiki-reply-context'>
            How did you implement page table in the pintos project
            </div>
          </div>
        </div>
      );
    }
  }

  RepliesList.propTypes = {
  };