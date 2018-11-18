import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import AuthUserContext from './AuthUserContext';
import './App.css';
import withAuthentication from './withAuthentication';

const LandingPage = () =>
	<div className="Initial">	
		<div className="Title">
			<Link to={routes.LANDING}>
				<img id="logo" src={require('./images/logo.png')}/>
			</Link>
		</div>
		<div className="text">
			Welcome! <br></br>
			GradBridge provides information related to admission of KAIST graduate school.
			<br></br>
			Previous applicants can collaborate to make GradBridge more reliable and awesome!
			<br></br>
			<br></br>
			To get started, click on the department that you are interested in.
		</div>
		<div className="major-list">
			<AuthUserContext.Consumer>
			 	{authUser => authUser
	  				? <LinkAuth />
	  				: <LinkNonAuth />
				}
    		</AuthUserContext.Consumer>
			<img className="major" src ={require('./images/EE.png')}/>
			<img className="major" src ={require('./images/ME.png')}/>
			<img className="major" src ={require('./images/AE.png')}/>
		</div>
	</div>

const LinkAuth = () =>
	<Link to={routes.WIKI}><img className="major" src={require('./images/CS.png')}/></Link>

const LinkNonAuth = () =>
	<Link to={routes.SIGN_IN}><img className="major" src={require('./images/CS.png')}/></Link>

export default withAuthentication(LandingPage);
