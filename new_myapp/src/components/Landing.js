import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';


const LandingPage = () =>
    <div>
        <ul>
        	<li><Link to={routes.WIKI}>CS</Link></li>
        	<li>ME</li>
        	<li>EE</li>
        	<li>CBE</li>
    	</ul>
    </div>

export default LandingPage;
