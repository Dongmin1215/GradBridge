import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = () =>
    <ul>
        <li>Have you applied to graduate school before?</li>
        <li><Link to={routes.SIGN_UP_EDITOR}>Yes</Link></li>
        <li><Link to={routes.SIGN_UP_VISITOR}>No</Link></li>
    </ul>

const SignUpLink = () =>
    <div className="login-signup">
        <p>
            Don't have an account?
            {' '}
            <Link to={routes.SIGN_UP}>Sign Up</Link>
        </p>
    </div>

export default SignUpPage;

export {
    SignUpLink,
  };