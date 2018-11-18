import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { firebase } from '../firebase';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import AccountPage from './Account';
import WikiPage from './Wiki';
import SignUpEditorPage from './SignUpEditor';
import SignUpVisitorPage from './SignUpVisitor';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
        <Router>
          <div>
            <Route exact path={routes.LANDING} component={LandingPage} authUser={this.state.authUser}/>
            <Route exact path={routes.SIGN_UP} component={SignUpPage} />
            <Route exact path={routes.SIGN_IN} component={SignInPage} />
            <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route exact path={routes.ACCOUNT} component={AccountPage} />
            <Route exact path={routes.WIKI} component={WikiPage} />
            <Route exact path={routes.SIGN_UP_EDITOR} component={SignUpEditorPage} />
            <Route exact path={routes.SIGN_UP_VISITOR} component={SignUpVisitorPage} />
          </div>
        </Router>
    );
  }
}

export default withAuthentication(App);