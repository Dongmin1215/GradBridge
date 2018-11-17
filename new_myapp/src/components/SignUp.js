import React, { Component } from 'react';

const SignUpPage = () =>
    <ul>
        <li>Have you applied to graduate school before?</li>
        <li><Link to={routes.SIGN_UP_EDITOR}>Yes</Link></li>
        <li><Link to={routes.SIGN_UP_VISITOR}>No</Link></li>
    </ul>

export default SignUpPage;