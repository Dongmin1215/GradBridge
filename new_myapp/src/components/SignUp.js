import React from 'react';
import { Link } from 'react-router-dom';

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