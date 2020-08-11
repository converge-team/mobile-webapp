
import { combineReducers } from 'redux';
import authentication from './auth.reducer';
import messages from './message.reducer';
import screenReducer from './screen.reducer';

const rootReducer = combineReducers({
    auth: authentication,
    messages,
    screens: screenReducer
});

export default rootReducer;