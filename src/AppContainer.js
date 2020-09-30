import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { userOnline, userOffline, typing, stopTyping, newMessage, fetchAllMessages, addFriend, fetchMessageForFriend, newFriendProfilePhoto } from './_actions/message.actions'

import PrivateRoute from './_components/PrivateRoute';
import { Settings } from './screens/SettingsScreen';
import { FriendProfile } from './screens/FriendProfile';
import { MessageScreen } from './screens/MessageScreen';
import { HomeScreen } from './screens/home_screen';
import LoadScreen from './_components/LoadScreen';

import { loginSuccess, logout } from './_actions/auth.actions';


import service from './services/services';
import SearchScreen from './screens/SearchScreen';
import ChangePhotoScreen from './screens/ChangePhotoScreen';
import PhotoScreen from './screens/PhotoScreen';

// This Component houses all secure roots. So that socket initialization can 
// happen here only when authenticated.

var socket;

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socketConnected: false,
            error: false,
            photoBlob: ''
        }
        this.socketRef = React.createRef();
    }

    async componentDidMount() {
        console.log(this.props)

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
                    });
                    socket = this.socketRef.current;

                    dispatch(fetchAllMessages());

                    this.setState({
                        socketConnected: true
                    });

                    console.log('perrrrsons: ', this.props.persons)

                    socket.on('new_msg', async ({ userId, message }) => {
                        console.log(userId, ' sent ', message)
                        const userInAppState = this.props.persons.find(person => (
                            person._id === userId
                        ));

                        if(!userInAppState) {
                            await dispatch(fetchMessageForFriend(userId));
                        }
                        
                        dispatch(newMessage(userId, message));
                    })

                    socket.on('typing', ({ username }) => {
                        dispatch(typing(username))
                    })

                    socket.on('stop_typing', ({ username }) => {
                        dispatch(stopTyping(username))
                    });

                    socket.on('new_profile_photo', (data) => {
                        dispatch(newFriendProfilePhoto(data));
                    })

                    socket.on('online', (data) => {
                        dispatch(userOnline(data));
                    })

                    socket.on('offline', (data) => {
                        dispatch(userOffline(data));
                    })


                } else {
                    console.warn('failure to login')
                    dispatch(logout());
                }
            })
            .catch(error => {
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
                            <PrivateRoute path="/search" component={SearchScreen} />
                            <PrivateRoute path="/change-photo" component={ChangePhotoScreen} />
                            <PrivateRoute path="/photo/:username" exact component={PhotoScreen} />
                            <PrivateRoute path="/your-photo/" exact owner component={PhotoScreen}/>
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