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
        <div className = 'wiki-reply-input-box'> 
          <div className = 'wiki-reply-add'>
            <input className = 'wiki-reply-input' type = 'text'></input>
            <button className = 'wiki-reply-addbutton' type="submit">
              <div className = 'wiki-submit-text'>ADD</div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

RepliesList.propTypes = {
};