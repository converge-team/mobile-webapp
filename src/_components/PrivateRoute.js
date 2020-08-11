import { Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('user')
        ? <Component {...props} />
        : <Redirect to='/login' />
    )}/>
);

export default PrivateRoute;
