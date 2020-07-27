import { constants } from '../_actions/actions';

const user = JSON.parse(localStorage.getItem('user'));

const initialAuthState = user ? { loggedIn: true, requestingLogin: false, user } : {}

const authentication = (state = initialAuthState, action) => {
    switch(action.type) {
        case constants.REQUESTING_LOGIN:
            return {
                requestingLogin: true,
                loggedIn: false,
                user: action.user
            }
        case constants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                requestingLogin: false,
                user: action.user
            }
        case constants.LOGIN_FAILURE:
            return {
                loginFail: true,
                message: action.message
            };
        case constants.LOGOUT:
            return {};
        
        default:
            return state;
    }
}

export default authentication;