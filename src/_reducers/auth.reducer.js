import { authConstants } from '../_actions/auth.actions';

const user = JSON.parse(localStorage.getItem('user456fg£'));

const initialAuthState = user ? { verified: user.is_verified, loggedIn: true, requestingLogin: false, user } : {}

const authentication = (state = initialAuthState, action) => {
    switch(action.type) {
        case authConstants.REQUESTING_LOGIN:
            return {
                
                requestingLogin: true,
                loggedIn: false,
            }
        case authConstants.LOGIN_SUCCESS:
            return {
                verified: action.user.is_verified,
                loggedIn: true,
                requestingLogin: false,
                user: action.user
            }
        case authConstants.LOGIN_FAILURE:
            return {
                loginFail: true,
                message: action.message
            };
        case authConstants.LOGOUT:
            return {};
        case authConstants.EMAIL_VERIFIED_FAIL:
            return { ...state, emailVerification: false };
        
        default:
            return state;
    }
}

export default authentication;