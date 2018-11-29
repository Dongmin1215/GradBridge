import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpEditorPage = ({history}) =>
    <div>
        <SignUpEditorForm history={history} />
    </div>

const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    under_uni: '',
    under_major: '',
    gpa: '',
    adm_year: '',
    app_dept: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class SignUpEditorForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            email,
            passwordOne,
            under_uni,
            under_major,
            gpa,
            admission_year,
            applied_dept,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                
                // Create a user in your own accessible Firebase Database too
                db.doCreateEditor(authUser.user.uid, email, admission_year, applied_dept, under_uni, under_major, gpa)
                    .then(() => {
                    this.setState({ ...INITIAL_STATE });
                    history.push(routes.WIKI);
                    })
                    .catch(error => {
                    this.setState(byPropKey('error', error));
                    });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
        event.preventDefault();
    }

    render() {
        const {
            email,
            passwordOne,
            passwordTwo,
            under_uni,
            under_major,
            gpa,
            admission_year,
            applied_dept,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            under_uni === '' ||
            under_major === '' ||
            gpa === '' ||
            admission_year === '' ||
            applied_dept === '';

        return (
            <form onSubmit={this.onSubmit}>
            <div className = "sign-up-page">
                <div className="Title">
			        <Link to={routes.LANDING}>
				    <img id="top-logo" src={require('./images/logo.png')}/>
			        </Link>
		        </div>
            
                <div className = "sign-up-row">
                <div className = "sign-up-left">
                    <div className = "user-info">
                        <div className = "sign-up-category"> 
                            <div id = "sign-up-type">Email</div>
                        </div>
                        <div> 
                        <input className ="sign-up-input" value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="please use your KAIST email"></input>
                        </div>
                    </div>
                    <div className = "user-info">
                        <div className = "sign-up-category">
                        <div id = "sign-up-type">Password</div>
                        </div>
                        <div>
                        <input type="password" className ="sign-up-input" value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        placeholder="6 characters or more"></input>
                        </div>
                    </div>
                    <div className = "user-info">
                        <div className = "sign-up-category">
                            <div id = "sign-up-type">Check Password</div>
                        </div>
                        <div>
                        <input type="password" className ="sign-up-input" value={passwordTwo}
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        placeholder="password again"></input>
                        </div>
                    </div>
                    <div className = "user-info">
                        <div className = "sign-up-category">
                            <div id = "sign-up-type">Undergraduate University</div>
                        </div>
                        <div>
                        <select className = "sign-up-selection"
                            onChange={event => this.setState(byPropKey('under_uni', event.target.value))}>
                            <option value="" disabled selected>-------------</option>
                            <option value="kaist">KAIST</option>
                            <option value="others">Others</option>
                        </select>
                        </div>
                    </div>
                </div>

                <div className = "sign-up-right">
                    <div className = "user-info">
                    <div className = "sign-up-category-right">
                        <div id = "sign-up-type">Undergraduate Major</div>
                    </div>
                    <div>
                        <select className = "sign-up-selection"
                            onChange={event => this.setState(byPropKey('under_major', event.target.value))}>
                        <option value="" disabled selected>-------------</option>
                        <option value="cs">Computer Science</option>
                        <option value="ee">Electrical Engineering</option>
                        <option value="me">Mechanical Engineering</option>
                        <option value="cbe">Chemical and Biomolecular Engineering</option>
                        <option value="bs">Biological Sciences</option>
                        <option value="ch">Chemistry</option>
                        <option value="ms">Mathematical Sciences</option>
                        <option value="ph">Physics</option>
                        <option value="ae">Aerospace Engineering</option>
                        <option value="bb">Bio and Brain Engineering</option>
                        <option value="cee">Civil and Environmental Engineering</option>
                        <option value="id">Industrial Design</option>
                        <option value="ie">Industrial Engineering</option>
                        <option value="nqe">Nuclear and Quantum Engineering</option>
                        <option value="ot">Other</option>
                        </select>
                    </div>
                    </div>
                    <div className = "user-info">
                    <div className = "sign-up-category-right">
                        <div id = "sign-up-type">GPA</div>
                    </div>
                    <div>
                    <select className = "sign-up-selection"
                            onChange={event => this.setState(byPropKey('gpa', event.target.value))}>
                        <option value="" disabled selected>out of 4.3</option>
                        <option value="0.0">0.0 ~ 2.5</option>
                        <option value="2.5">2.5 ~ 3.0</option>
                        <option value="3.0">3.0 ~ 3.5</option>
                        <option value="3.5">3.5 ~ 4.0</option>
                        <option value="4.0">4.0 ~ 4.3</option>
                        </select>
                    </div>
                    </div>
                    <div className = "user-info">
                    <div className = "sign-up-category-right">
                        <div id = "sign-up-type">Admission Year</div>
                    </div>
                    <div>
                        <select className = "sign-up-selection"
                            onChange={event => this.setState(byPropKey('admission_year', event.target.value))}>
                        <option value="" disabled selected>-------------</option>
                        <option value="19 Spring">2019 Spring</option>
                        <option value="18 Fall">2018 Fall</option>
                        <option value="18 Spring">2018 Spring</option>
                        <option value="17 Fall">2017 Fall</option>
                        <option value="17 Spring">2017 Spring</option>
                        <option value="16 Fall">2016 Fall</option>
                        <option value="16 Spring">2016 Spring</option>
                        <option value="15 Fall">2015 Fall</option>
                        <option value="15 Spring">2015 Spring</option>
                        <option value="etc">Before</option>
                        </select>
                    </div>
                    </div>
                    <div className = "user-info">
                    <div className = "sign-up-category-right">
                        <div id = "sign-up-type">Applied Department</div>
                    </div>
                    <div>
                        <select className = "sign-up-selection"
                            onChange={event => this.setState(byPropKey('applied_dept', event.target.value))}>
                        <option value="" disabled selected>-------------</option>
                        <option value="cs">Computer Science</option>
                        <option value="ee">Electrical Engineering</option>
                        <option value="me">Mechanical Engineering</option>
                        <option value="cbe">Chemical and Biomolecular Engineering</option>
                        </select>
                    </div>
                    </div>

                </div>
                </div>
                <div className ="button-wrapper">
                    <div className = "register-button">
                        <button className = "sign-up-register" disabled={isInvalid} type="submit">
                            <div id = "sign-up-btn">Register</div>
                        </button>
                    </div>
                </div>
            </div>
                    { error &&  alert(error.message) }
            </form>
        );
    }
}

export default withRouter(SignUpEditorPage);

export {
    SignUpEditorForm
};