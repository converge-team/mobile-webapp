import React, { Component } from 'react';
import { HomeScreen } from './screens/home_screen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from './screens/login_screen';
import { MessageScreen } from './screens/MessageScreen';
import PrivateRoute from './_components/PrivateRoute';
import { Settings } from './screens/SettingsScreen';
import { FriendProfile } from './screens/FriendProfile';

import './css/style.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {  
    return (
      <Router>

        <Switch>
          <PrivateRoute path="/" exact component={HomeScreen} />
          <PrivateRoute path="/message/:id" exact component={MessageScreen} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/profile/:id" component={FriendProfile} />
        </Switch>
      </Router>
    );
  }

}

export default App;
