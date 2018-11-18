import React from 'react';

import { auth } from '../firebase';

const SignOutButton = () =>
  <div id="wiki-signin-text"
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </div>

export default SignOutButton;
