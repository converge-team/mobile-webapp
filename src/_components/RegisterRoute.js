
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function RegisterRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest}
            render={(props) => (
                localStorage.getItem('user')
                    ? JSON.parse(localStorage.getItem('user')).is_verified
                        ? <Redirect to="/" />
                        : <Redirect to="/mailed" />
                    : <Component {...props} />
            )}
        />
    );
}

export default RegisterRoute;