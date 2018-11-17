import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import './App.css';

const LandingPage = () =>
	<div className="Initial">
			
		<div className="Title">
			<img id="logo" src={require('./images/logo.png')}/>
			<h1>GradBridge</h1>
		</div>
		<div className="Text">
			Welcome! <br></br>
			GradBridge provides information related to admission of KAIST graduate school.
			<br></br>
			Previous applicants can collaborate to make GradBridge more reliable and awesome!
			<br></br>
			<br></br>
			To get started, click on the department that you are interested in.
			</div>
			<div className="Major">
			<Link to={routes.WIKI}><img id="CS" src={require('./images/CS.png')}/></Link>
			<img id="EE" src ={require('./images/EE.png')}/>
			<img id="ME" src ={require('./images/ME.png')}/>
			<img id="AE" src ={require('./images/AE.png')}/>
		</div>
	</div>


export default LandingPage;
