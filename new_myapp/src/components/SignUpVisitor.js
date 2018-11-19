import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpVisitorPage = ({history}) =>
    <div>
        <SignUpVisitorForm history={history} />
    </div>

const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    under_uni: '',
    under_major: '',
    expected_grad: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class SignUpVisitorForm extends Component {
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
            expected_grad,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                
                // Create a user in your own accessible Firebase Database too
                db.doCreateVisitor(authUser.user.uid, email, "null", under_uni, under_major, expected_grad)
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
            username,
            email,
            passwordOne,
            passwordTwo,
            under_uni,
            under_major,
            expected_grad,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' ||
            under_uni === '' ||
            under_major === '' ||
            expected_grad === '';

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
                        placeholder="email address"></input>
                        </div>
                    </div>
                    <div className = "user-info">
                        <div className = "sign-up-category">
                        <div id = "sign-up-type">Password</div>
                        </div>
                        <div>
                        <input type="password" className ="sign-up-input" value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        placeholder="password"></input>
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
                </div>

                <div className = "sign-up-right">
                <div className = "user-info">
                        <div className = "sign-up-category-right">
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
                            <option value="ae">Aerospace Engineering</option>
                        </select>
                        </div>
                    </div>

                    <div className = "user-info">
                        <div className = "sign-up-category-right">
                            <div id = "sign-up-type">Expected Graduation</div>
                        </div>
                        <div>
                            <select className = "sign-up-selection"
                            onChange={event => this.setState(byPropKey('expected_grad', event.target.value))}>
                            <option value="" disabled selected>final semester</option>
                            <option value="19 Fall">2019 Fall</option>
                            <option value="20 Spring">2020 Spring</option>
                            <option value="20 Fall">2020 Fall</option>
                            <option value="21 Spring">2021 Spring</option>
                            <option value="21 Fall">2021 Fall</option>
                            <option value="22 Spring">2022 Spring</option>
                            <option value="22 Fall">2022 Fall</option>
                            <option value="etc">After</option>
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

                { error && <p>{error.message}</p> }
            </form>
        );
    }
}

export default withRouter(SignUpVisitorPage);

export {
    SignUpVisitorForm,
};
