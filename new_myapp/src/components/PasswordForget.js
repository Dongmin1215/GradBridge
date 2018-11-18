import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

const PasswordForgetPage = () =>
  <div className="sign-up-page">
    <div className="Title">
			<Link to={routes.LANDING}>
				<img id="top-logo" src={require('./images/logo.png')}/>
			</Link>
		</div>
    <div className='sign-up-question'>
    Type your email address please.
    </div>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
  success: false,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState({ 
          email: '',
          error: null,
          success: true
        });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
      success,
    } = this.state;

    const isInvalid = email === '';

    return (
      <div className='find-pw-types'>
        <form onSubmit={this.onSubmit}>
          <div className='login-left'>
            <input className ="find-pw-input"
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div className='login-right'>
            <button disabled={isInvalid} type="submit" className='find-pw-ans'>
              Reset Password
            </button>
          </div>

          { success && <p>success</p>}
          { error && <p>{error.message}</p> }
        </form>
      </div>
    );
  }
}

const PasswordForgetLink = () =>
  <div className = "login-findpwd">
    <p>
      <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  </div>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};