import service from '../_services/services';

export const constants = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    ERROR: 'LOGIN_ERROR',
    REQUESTING_LOGIN: 'REQUESTING_LOGIN',
    LOGOUT: 'LOGOUT',
    FETCHING_MESSAGES: 'FETCHING_MESSAGES',
    FETCHED_MESSAGES: 'FETCHED_MESSAGES',
    FETCHED_MESSAGES_FAIL: 'FETCHED_MESSAGES_FAIL'
}

const loginRequest = (user) => ({
    type: constants.REQUESTING_LOGIN,
    user
})

const loginSuccess = (user) => ({
    type: constants.LOGIN_SUCCESS,
    user
})

const loginFailure = (message) => ({
    type: constants.LOGIN_FAILURE,
    message
})

export const logout = () => {
    service.logoutUser();
    return {
        type: constants.LOGOUT
    }
}

const fetchingMessages = () => {
    return {
        type: constants.FETCHING_MESSAGES
    }
}

const fetchedMessages = (friends) => {
    return {
        type: constants.FETCHED_MESSAGES,
        friends
    }
}

const messageFetchFail = () => {
    return {
        type: constants.FETCHED_MESSAGES_FAIL
    }
}

export const login = (username, password) => {
    return dispatch => {
        dispatch(loginRequest({username, password}));
        service.loginUser(username, password)
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

export const fetchAllMessages = () => {
    return dispatch => {
        dispatch(fetchingMessages());

        service.getFriendsAndMessage()
            .then(friends => {
                dispatch(fetchedMessages(friends))
            })
            .catch(error => {
                dispatch(messageFetchFail());
                // console.log('error while fetching messages')
            });
    }
}