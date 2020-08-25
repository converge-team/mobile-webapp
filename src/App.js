import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import { LoginPage } from './screens/login_screen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import MailSent from './_components/MailSent';
import RegisterRoute from './_components/RegisterRoute';
import ConfirmEmailScreen from './screens/ConfirmEmailScreen';
import PrivateRoute from './_components/PrivateRoute'
import AppContainer from './AppContainer';




import './css/style.css';

class App extends Component {

  render() {
    return (
      <Router>

        <Switch>
          <Route path="/mailed" component={MailSent} />
          <Route path="/verify-email/:key" component={ConfirmEmailScreen} />
          <RegisterRoute path="/login" component={LoginPage} />
          <RegisterRoute path="/signup" component={SignUpScreen} />
          <RegisterRoute path="/welcome" component={WelcomeScreen} />
          <PrivateRoute path="/" component={AppContainer} />
        </Switch>
      </Router>
    );
  }

}

export default App;
