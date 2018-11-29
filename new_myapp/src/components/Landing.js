import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import AuthUserContext from './AuthUserContext';
import './App.css';
import withAuthentication from './withAuthentication';

var is_first = true

function change_bool() {
	if (is_first) {
	  is_first= false;
	}
	return is_first;
  }
  
  function change_to_true(){
	if (! is_first){
	  is_first = true;
	}
	return is_first;
  }
  
function click_change_bool(e){
	if (! is_first){
	is_first = true;
	}
	
	alert('This department is on progress. Please use CS department');
}
const LandingPage = () =>
	<div className="landing-Initial">	
		<div>
		</div>
		<div className="landing-Title">
			<Link to={routes.LANDING}>
				<img id="logo" src={require('./images/logo.png')}/>
			</Link>
		</div>
		<div className="text">
			안녕하세요! <br></br>
			GradBridge는 카이스트 대학원 입시에 관련된 정보를 제공합니다.
			<br></br>
			더 풍부하고 믿을만한 정보를 위해서 입시 경험자들의 도움이 필요해요.
			<br></br>
			이전 지원자들로부터 어떤 정보가 모아졌는지 볼까요?
			<br></br>
			<br></br>
			관심 있는 학과를 선택해주세요.
		</div>
		<div className="major-list">
			<AuthUserContext.Consumer>
			 	{authUser => authUser
	  				? <LinkAuth />
	  				: <LinkNonAuth />
				}
    		</AuthUserContext.Consumer>

			<img className="major major-notCS" onClick = {((e) => click_change_bool())} src ={require('./images/EE.png')}/>
			<img className="major major-notCS" onClick = {((e) => click_change_bool())} src ={require('./images/ME.png')}/>
			<img className="major major-notCS" onClick = {((e) => click_change_bool())} src ={require('./images/cbe.png')}/>
		</div>

		{change_bool()}
	</div>

const LinkAuth = () =>
	<Link to={routes.WIKI}><img className="major" src={require('./images/CS.png')}/></Link>

const LinkNonAuth = () =>
	<Link to={routes.SIGN_IN}><img className="major" src={require('./images/CS.png')}/></Link>

export default withAuthentication(LandingPage);
