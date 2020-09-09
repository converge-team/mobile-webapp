import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { register } from '../_actions/auth.actions'
import service from '../_services/services';

import WaveBottom from '../_components/WaveBottom';

class SignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            passwordShown: false,
            errorShown: false,
            usernameValid: null,
            emailValid: null
        }

        this.indicator = React.createRef();

        this.showPassword = this.showPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    checkUser() {
        const { user, verified } = this.props;
        if (user) {
            if (!verified) {
                return this.props.history.push('/mailed');
            }
            this.props.history.push('/');
        } else {
            return
        }
    }

    componentDidUpdate() {
        this.checkUser();

        if (this.indicator.current) {
            setTimeout(() => {
                console.log('fade now')
                this.indicator.current.classList.add('faded')
            }, 6000);
        }
    }


    showPassword(e) {
        this.setState(state => ({
            showPassword: !state.showPassword
        }))
    }

    handleChange(e) {

        let { name, value } = e.target;

        this.setState({
            [name]: value,
            [`${name}Valid`]: 'fetching'
        });

        if (name === 'username' || name === 'email') {
            service.auth.checkValidity(name, value)
                .then(success => {
                    if (success) {
                        console.log(success)
                        this.setState({
                            [`${name}Valid`]: true
                        })
                    } else {
                        this.setState({
                            [`${name}Valid`]: false
                        })
                    }
                })
        }
    }

    handleSubmit(e) {

        let userObject = Object.assign({}, this.state);
        let valid = userObject.usernameValid && userObject.emailValid;

        delete userObject.showPassword;
        delete userObject.usernameValid;
        delete userObject.emailValid;

        if (Object.values(userObject).includes('') || !valid) {
            return
        } else {
            e.preventDefault();
            this.props.dispatch(register(userObject));
        }
    }

    render() {
        let { username, email, password, first_name, last_name } = this.state;

        const { loginFail, message } = this.props;

        return (
            <div className="sign_up">
                {
                    loginFail &&
                    <div className="indicator" ref={this.indicator}>
                        <span>
                            {message}
                        </span>
                    </div>
                }
                <WaveBottom text="Create Account" />
                <form>
                    <div className="relativer">
                        <div className="input-icon">
                            <i className="far fa-envelope"></i>
                        </div>
                        <input value={email} name="email" placeholder="Email" onChange={this.handleChange} required />
                        <div className="input-icon">
                            {
                                this.state.emailValid !== null
                                    ? this.state.emailValid !== 'fetching'
                                        ? this.state.emailValid && this.state.email
                                            ? <i className="fas fa-check"></i>
                                            : <i className="fas fa-times danger"></i>
                                        : <i className="fas fa-spinner"></i>
                                    : ''
                            }
                        </div>
                        <span className="focuser"></span>
                    </div>
                    <div className="relativer">
                        <div className="input-icon">
                            <i className="far fa-user"></i>
                        </div>
                        <input value={username} name="username" placeholder="Username" onChange={this.handleChange} required />
                        <div className="input-icon">
                            {
                                this.state.usernameValid !== null
                                    ? this.state.usernameValid !== 'fetching'
                                        ? this.state.usernameValid && this.state.username
                                            ? <i className="fas fa-check"></i>
                                            : <i className="fas fa-times danger"></i>
                                        : <i className="fas fa-spinner"></i>
                                    : ''
                            }                        </div>
                        <span className="focuser"></span>
                    </div>
                    <div className="relativer">
                        <div className="input-icon">
                            A
                        </div>
                        <input value={first_name} name="first_name" placeholder="First Name" onChange={this.handleChange} required />
                        <span className="focuser"></span>
                    </div>
                    <div className="relativer">
                        <div className="input-icon">
                            L
                        </div>
                        <input value={last_name} name="last_name" placeholder="Last Name" onChange={this.handleChange} required />
                        <span className="focuser"></span>
                    </div>
                    <div className="relativer">
                        <div className="input-icon">
                            <i className="fas fa-lock"></i>
                        </div>
                        <input value={password} type={!this.state.showPassword ? 'password' : 'text'} name="password" placeholder="Password" onChange={this.handleChange} required />
                        <div className="input-icon" onClick={this.showPassword}>
                            {
                                this.state.showPassword
                                    ? <i className="fas fa-eye-slash"></i>
                                    : <i className="fas fa-eye"></i>
                            }
                        </div>
                        <span className="focuser"></span>
                    </div>

                    <button onClick={this.handleSubmit} type="submit" className="sign_up_button">
                        {
                            this.props.requestingLogin
                                ? <div className="rythmer">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                                : "Sign Up"
                        }
                    </button>
                    <p>or</p>
                    <Link to="/login">
                        <button id="to_login">Log In</button>
                    </Link>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => (
    { ...state.auth }
);


const connectedSignUpScreen = connect(mapStateToProps)(SignUpScreen);

export default connectedSignUpScreen;