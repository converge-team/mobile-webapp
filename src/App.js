import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from './screens/login_screen';
import AppContainer from './AppContainer';



import './css/style.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {  
    return (
      <Router>

        <Switch>
          <Route path="/login" component={LoginPage} />
          <AppContainer />
        </Switch>
      </Router>
    );
  }

}

export default App;
