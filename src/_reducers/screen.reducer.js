import { screenConstants } from '../_actions/screen.actions';

const initialState = {home: false, message_screen: false, settings: false}

const screenReducer = (state = initialState, action) => {
    switch(action.type) {
        case screenConstants.SCREEN_LOADED:
            return {...state, [action.screen]: true}
        default:
            return state
    }
}

export default screenReducer;