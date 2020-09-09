import service from '../_services/services';

export const authConstants = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    ERROR: 'LOGIN_ERROR',
    REQUESTING_LOGIN: 'REQUESTING_LOGIN',
    LOGOUT: 'LOGOUT',
    EMAIL_VERIFIED_FAIL: 'EMAIL_VERIFIED_FAIL'
}

const loginRequest = (user) => ({
    type: authConstants.REQUESTING_LOGIN,
    user
})
    
export const loginSuccess = (user) => ({
    type: authConstants.LOGIN_SUCCESS,
    user
})

const loginFailure = (message) => ({
    type: authConstants.LOGIN_FAILURE,
    message
})

export const logout = () => {
    service.auth.logoutUser();
    return {
        type: authConstants.LOGOUT
    }
}

const verifyFailure = () => {
    return {
        type: authConstants.EMAIL_VERIFIED_FAIL
    }
}

export const login = (username, password) => {
    return dispatch => {
        dispatch(loginRequest({username}));
        service.auth.loginUser(username, password)
            .then(user => {
                if(user)
                    dispatch(loginSuccess(user));
                // console.log('user>>>', user)
            })
            .catch(err => {
                dispatch(loginFailure(err.message))
            })
    }

}

export const register = (userObject) => {
    return dispatch => {
        dispatch(loginRequest(userObject))
        service.auth.registerUser(userObject)
            .then(user => {
                if(user) dispatch(loginSuccess(user));
            })
            .catch(err => {
                dispatch(loginFailure(err.message))
            })
    }
}

export const verifyEmail = (key) => {
    return dispatch => {
        service.auth.verifyEmail(key)
            .then(user => {
                if(user) dispatch(loginSuccess(user));
            })
            .catch((error) => {
                dispatch(verifyFailure(error.message));
            })
    }
}

export const authenticateUser = (token) => {
    return dispatch => {
        service.auth.authenticateUser(token)
        .then(success => {
            if(success)
                dispatch(loginSuccess(JSON.parse(localStorage.getItem('user456fg£')).api_token));
            else 
                dispatch(logout());
        })
        .then(error => dispatch(loginFailure(error.message)))
    }
}