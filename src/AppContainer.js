import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { userOnline, userOffline, typing, stopTyping, newMessage } from './_actions/message.actions'

import PrivateRoute from './_components/PrivateRoute';
import { Settings } from './screens/SettingsScreen';
import { FriendProfile } from './screens/FriendProfile';
import { MessageScreen } from './screens/MessageScreen';
import { HomeScreen } from './screens/home_screen';
import LoadScreen from './_components/LoadScreen';
import { loginSuccess, logout } from './_actions/auth.actions';
import service from './_services/services';

// This Component houses all secure roots. So that socket initialization can 
// happen here only when authenticated.

var socket;

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socketConnected: false,
            error: false
        }
        this.socketRef = React.createRef();
    }

    async componentDidMount() {

        const { dispatch } = this.props;

        const apiUrl = process.env.NODE_ENV === 'production'
            ? 'https://convrge.herokuapp.com/'
            : "/";


        const user = JSON.parse(localStorage.getItem('user456fg£'));
        const token = user.api_token;

        service.auth.authenticateUser(token)
            .then(async success => {
                if (success) {

                    dispatch(loginSuccess(user));

                    this.socketRef.current = await io.connect(apiUrl, {
                        query: `token=${token}`,
                    })
                    socket = this.socketRef.current;

                    this.setState({
                        socketConnected: true
                    });

                    socket.on('new_msg', ({ username, message }) => {
                        dispatch(newMessage(username, message));
                    })

                    socket.on('typing', ({ username }) => {
                        dispatch(typing(username))
                    })

                    socket.on('stop_typing', ({ username }) => {
                        dispatch(stopTyping(username))
                    });

                    socket.on('online', (data) => {
                        dispatch(userOnline(data));
                    })

                    socket.on('offline', (data) => {
                        dispatch(userOffline(data));
                    })


                } else {
                    console.log('failure to login')
                    dispatch(logout());
                }
            })
            .catch(error => {
                console.log('error')
                this.setState({
                    error: true
                })
            })

    }

    render() {
        const socket = this.socketRef.current
        return (
            <div id="main_app">
                {
                    this.state.socketConnected
                        ?
                        <Fragment>
                            <PrivateRoute socket={socket} path="/" exact component={HomeScreen} />
                            <PrivateRoute socket={socket} path="/message/:id" exact component={MessageScreen} />
                            <PrivateRoute path="/settings" component={Settings} />
                            <PrivateRoute socket={socket} path="/profile/:id" component={FriendProfile} />
                        </Fragment>
                        : !this.state.error
                            ? <LoadScreen homePage={true} />
                            : <LoadScreen error={true}/>
                }

            </div>
        );
    }
}

const mapStateToProps = state => (
    { ...state.messages }
);

const connectedAppContainer = connect(mapStateToProps, null)(AppContainer);

export default connectedAppContainer;
export { socket }