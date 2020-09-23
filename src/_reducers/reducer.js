
import { combineReducers } from 'redux';
import authentication from './auth.reducer';
import messages from './message.reducer';
import screenReducer from './screen.reducer';
import profileReducer from './profile.reducer';

const rootReducer = combineReducers({
    auth: authentication,
    messages,
    screens: screenReducer,
    profile: profileReducer
});

export default rootReducer;