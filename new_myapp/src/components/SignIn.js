import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import './App.css';

const SignInPage = ({ history }) =>
  <div>
    <SignInForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.WIKI);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>

      <div className = "sign-up-page">
        <div className = "Top">
          <div className="Top-Title">
            <img id="top-logo" src={require('./images/logo.png')}/>
            <p>GradBridge</p>
          </div>
        </div>
        <div className = "log-in-box">

          <div className = "Sign-up-left">
            <div className = "user-info">
              <div className = "Sing-up-category"> 
              <div id = "sign-up-type">E-mail</div>
              </div>
              <div>
                <input className ="sign-up-input"
                  value={email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className = "user-info">
              <div className = "Sing-up-category">
                <div id = "sign-up-type">Password</div>
              </div>
              <div>
                <input className ="sign-up-input"
                  value={password}
                  onChange={event => this.setState(byPropKey('password', event.target.value))}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
        
        <div className = "sign-up-right">
          <div className ="button-wrapper">
            <div className = "login-button">
              <button className = "sign-up-login" disabled={isInvalid} type="submit">
                <div id = "login-btn">LOG IN</div>
              </button>
            </div>
          </div>
        </div>
        </div>
        
        <PasswordForgetLink />
        <SignUpLink />
        
      </div>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};

