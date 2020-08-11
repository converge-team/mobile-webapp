import { constants } from '../_actions/actions';

const initialState = {home: false, message_screen: false, settings: false}

const screenReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.SCREEN_LOADED:
            return {...state, [action.screen]: true}
        default:
            return state
    }
}

export default screenReducer;