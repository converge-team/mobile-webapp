import React, { Component } from 'react';
import { login } from '../_actions/auth.actions';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username_or_email: '',
            password: '',
            submitted: false
        }
        
        // this.props.dispatch(logout());
        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } =  e.target;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const {dispatch} = this.props;
        const { username_or_email, password } = this.state;

        dispatch(login(username_or_email, password));

        this.setState({
            submitted: false,
        })

    }

    render() {
        return (
            //if no user in localstorage, show form else redirect
            // to homepage
            
            !localStorage.getItem('user456fg£') ?
            <form className="login_form">
                {
                    this.props.loginFail && 
                    <div className="failure">
                        <p>{this.props.message}</p>
                    </div>
                }

                <input value={this.state.username_or_email} onChange={this.handleChange} placeholder="Email or Username" name="username_or_email" type="text"/>

                <input value={this.state.password} onChange={this.handleChange} placeholder="Password" name="password" type="password"/>
                
                {
                    this.props.requestingLogin
                    ? <button type="submit" className="login" disabled onClick={this.handleSubmit} >Signing In...</button>
                    : <button type="submit" className="login" onClick={this.handleSubmit} >Sign In</button>
                }
                
            </form>
            : <Redirect to="/" />
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    // const { requestingLogin } = state.auth;

    return {
        ...state.auth
    }
}

const ConnectedLoginPage = connect(mapStateToProps)(LoginPage);

export { ConnectedLoginPage as LoginPage }