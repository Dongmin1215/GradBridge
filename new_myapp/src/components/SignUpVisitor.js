import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpVisitorPage = ({history}) =>
    <div>
        <h1>SignUp as Visitor</h1>
        <SignUpVisitorForm history={history} />
    </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
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
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                
                // Create a user in your own accessible Firebase Database too
                db.doCreateUser(authUser.user.uid, username, email)
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
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div className = "sign-up-page">
                <div className = "Top">
                    <div className="Top-Title">
                        <img id="top-logo" src={require('./images/logo.png')}/>
                        <p>GradBridge</p>
                    </div>
                </div>
            
                <div className = "sign-up-row">

                <div className = "Sign-up-left">
                    <div className = "user-info">
                        <div className = "Sing-up-category"> 
                            <div id = "sign-up-type">E-mail</div>
                        </div>
                        <div> 
                        <input className ="sign-up-input" value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"></input>
                        </div>
                    </div>
                    <div className = "user-info">
                        <div className = "Sing-up-category">
                        <div id = "sign-up-type">Password</div>
                        </div>
                        <div>
                        <input type="password" className ="sign-up-input" value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        placeholder="Password"></input>
                        </div>
                    </div>
                    <div className = "user-info">
                        <div className = "Sing-up-category">
                            <div id = "sign-up-type">Check Password</div>
                        </div>
                        <div>
                        <input type="password" className ="sign-up-input" value={passwordTwo}
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        placeholder="Password again"></input>
                        </div>
                    </div>
                
                </div>

                <div className = "sign-up-right">

                    <div className = "user-info">
                        <div className = "sign-up-category-right">
                            <div id = "sign-up-type-right">Undergraduate University</div>
                        </div>
                        <div>
                            <select className = "sign-up-selection">
                                <option value="" disabled selected>Select your Undergraduate University</option>
                                <option value="kaist">KAIST</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>

                    <div className = "user-info">
                        <div className = "sign-up-category-right">
                            <div id = "sign-up-type-right">Undergraduate Major</div>
                        </div>
                        <div>
                            <select className = "sign-up-selection">
                            <option value="" disabled selected>Select your Undergraduate Major</option>
                            <option value="cs">Computer Science</option>
                            <option value="ee">Electrical Engineering</option>
                            <option value="me">Mechanical Engineering</option>
                            <option value="ae">Aerospace Engineering</option>
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
