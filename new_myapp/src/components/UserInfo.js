import React, { Component } from 'react';
import { firebase, db } from '../firebase';
import PropTypes from 'prop-types';
import './App.css';

export default class UserInfo extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
          return null;
        }
        console.log(this.props.user);
        return (
          <div className = "profile-background">
            <img className = "profile-closeBtn" src={require('./images/close.png')} onClick={this.props.onClose}/>
            <div className = "profile-user-info">
                <img className = 'profile-user-pic' src={require('./images/user.png')}/>
                <div className = "profile-user-field">Undergraduate University</div>
                <div className = "profile-user-text">{this.props.user.under_uni}</div>
                <div className = "profile-user-field">Undergraduate Major</div>
                <div className = "profile-user-text">{this.props.user.under_major}</div>
                <div className = "profile-user-field">GPA</div>
                <div className = "profile-user-text">{this.props.user.gpa}</div>
            </div>
          </div>
        );
      }
  }

  UserInfo.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
  };