import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
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
        <div className = "top">
          <div className="top-title">
            <Link to={routes.LANDING}>
              <img id="logo" src={require('./images/logo.png')}/>
            </Link>
          </div>
        </div>
        <div className = "login-box">
          <div className = "login-left">
            <div className = "login-item">
              <div className = "login-category"> 
                <div id = "login-type">Email</div>
              </div>
              <div>
                <input className ="login-input"
                  value={email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  type="text"
                  placeholder="email address"
                />
              </div>
            </div>
            <div className = "login-item">
              <div className = "login-category">
                <div id = "login-type">Password</div>
              </div>
              <div>
                <input className ="login-input"
                  value={password}
                  onChange={event => this.setState(byPropKey('password', event.target.value))}
                  type="password"
                  placeholder="password"
                />
              </div>
            </div>
          </div>
        
          <div className = "login-right">
            <button className = "login-button" disabled={isInvalid} type="submit">
              <div id = "login-btn">Sign In</div>
            </button>
          </div>
        </div>
        
        <PasswordForgetLink />
        <SignUpLink />
        
      </div>
        { error && <div>{ alert(error.message) }</div>}
        
      </form>
    );
  }
}
Popup.alert('Hello');
export default withRouter(SignInPage);

export {
  SignInForm,
};

