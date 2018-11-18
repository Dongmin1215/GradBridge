import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

const PasswordForgetPage = () =>
  <div className="sign-up-page">
    <div className='sign-up-question'>
    Do you want to reset your password?
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
      <div className='sign-up-types'>
        <form onSubmit={this.onSubmit}>
          <input className = ""
            value={this.state.email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <button disabled={isInvalid} type="submit" className='sign-up-ans'>
            Reset My Password
          </button>

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