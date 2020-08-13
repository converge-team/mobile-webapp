import React, { Component } from 'react';

import PrivateRoute from './_components/PrivateRoute';
import { Settings } from './screens/SettingsScreen';
import { FriendProfile } from './screens/FriendProfile';
import { MessageScreen } from './screens/MessageScreen';
import { HomeScreen } from './screens/home_screen';

// This Component houses all secure roots. So that socket initialization can 
// happen here only when authenticated.

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="main_app">
                <PrivateRoute path="/" exact component={HomeScreen} />
                <PrivateRoute path="/message/:id" exact component={MessageScreen} />
                <PrivateRoute path="/settings" component={Settings} />
                <PrivateRoute path="/profile/:id" component={FriendProfile} />
            </div>
        );
    }
}

export default AppContainer;