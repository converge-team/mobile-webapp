import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ component: Component, socket, ...rest }) => (

    <Route {...rest} render={(props) => (
        localStorage.getItem('user456fg£')
            ? JSON.parse(localStorage.getItem('user456fg£')).is_verified
                ? <Component socket={socket} owner={rest.owner} {...props} />
                : <Redirect to="/mailed" />
            : <Redirect to='/welcome' />
    )} />

);

export default PrivateRoute;
