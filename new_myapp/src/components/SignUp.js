import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = () =>
    <div className="sign-up-page">
        <div className='sign-up-question'>
        Have you applied to graduate school before?
        </div>
        <div className='sign-up-types'>
        <Link to={routes.SIGN_UP_EDITOR}><button className='sign-up-ans'> Yes </button></Link>
        <Link to={routes.SIGN_UP_VISITOR}><button className='sign-up-ans'> No </button></Link>
        </div>
    </div>
        {/* <li><Link to={routes.SIGN_UP_EDITOR}>Yes</Link></li>
        <li><Link to={routes.SIGN_UP_VISITOR}>No</Link></li> */}

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