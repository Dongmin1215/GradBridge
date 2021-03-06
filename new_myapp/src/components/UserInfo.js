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
        var under_uni;
        var under_major;
        var gpa;
        if(!this.props.show) {
          return null;
        }
        if (this.props.user.under_uni === 'kaist'){
          under_uni = 'KAIST';
        }
        else {
          under_uni = 'Other than KAIST';
        }
        if (this.props.user.under_major === 'cs'){
          under_major = 'Computer Science';
        }
        else if (this.props.user.under_major === 'ee'){
          under_major = 'Electrical Engineering';
        }
        else if (this.props.user.under_major === 'me'){
          under_major = 'Mechanical Engingeering';
        }
        else if (this.props.user.under_major === 'cbe'){
          under_major = 'Chemical and Biomolecular Engineering';
        }
        else if (this.props.user.under_major === 'bs'){
          under_major = 'Biological Sciences';
        }
        else if (this.props.user.under_major === 'ch'){
          under_major = 'Chemistry';
        }
        else if (this.props.user.under_major === 'ms'){
          under_major = 'Mathematical Sciences';
        }
        else if (this.props.user.under_major === 'ph'){
          under_major = 'Physics';
        }
        else if (this.props.user.under_major === 'ae'){
          under_major = 'Aerospace Engineering';
        }
        else if (this.props.user.under_major === 'bb'){
          under_major = 'Bio and Brain Engineering';
        }
        else if (this.props.user.under_major === 'cee'){
          under_major = 'Civil and Environmental Engineering';
        }
        else if (this.props.user.under_major === 'id'){
          under_major = 'Industrial Design';
        }
        else if (this.props.user.under_major === 'ie'){
          under_major = 'Industrial Engineering';
        }
        else if (this.props.user.under_major === 'nqe'){
          under_major = 'Nuclear and Quantum Engineering';
        }
        else if (this.props.user.under_major === 'ot'){
          under_major = 'Other';
        }
        if (this.props.user.gpa === '0.0'){
          gpa = '0.0 ~ 2.5';
        }
        else if (this.props.user.gpa === '2.5'){
          gpa = '2.5 ~ 3.0'
        }
        else if (this.props.user.gpa === '3.0'){
          gpa = '3.0 ~ 3.5'
        }
        else if (this.props.user.gpa === '3.5'){
          gpa = '3.5 ~ 4.0'
        }
        else if (this.props.user.gpa === '4.0'){
          gpa = '4.0 ~ 4.3'
        }

        return (
          <div className = "profile-background">
            <div className = "profile-close-row">
            <img className = "profile-closeBtn" src={require('./images/close.png')} onClick={this.props.onClose}/>
            </div>
            <div className = "profile-user-info">
                <img className = 'profile-user-pic' src={require('./images/user.png')}/>
                <div className = "profile-user-field">Undergraduate University</div>
                <div className = "profile-user-text">{under_uni}</div>
                <div className = "profile-user-field">Undergraduate Major</div>
                <div className = "profile-user-text">{under_major}</div>
                <div className = "profile-user-field">GPA</div>
                <div className = "profile-user-text">{gpa}</div>
                <div className = "profile-user-field">Points</div>
                <div className = "profile-user-text">{this.props.user.points} pts</div>
            </div>
          </div>
        );
      }
  }
