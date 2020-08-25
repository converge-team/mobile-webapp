import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ component: Component, socket, ...rest }) => (

    <Route {...rest} render={(props) => (
        localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')).is_verified
                ? <Component socket={socket} {...props} />
                : <Redirect to="/mailed" />
            : <Redirect to='/login' />
    )} />

);

export default PrivateRoute;
