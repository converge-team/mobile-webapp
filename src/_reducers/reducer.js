
import { combineReducers } from 'redux';
import authentication from './auth.reducer';
import messages from './message.reducer';

const rootReducer = combineReducers({
    auth: authentication,
    messages
});

export default rootReducer;