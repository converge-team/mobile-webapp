import { constants } from '../_actions/actions';

const initialMessagesState = {
    fetchedMessages: false,
    messages: []
};

const messages = (state = initialMessagesState, action) => {

    switch(action.type) {
        case constants.FETCHING_MESSAGES:
            return {
                fetchingMessages: true,
                messages: []
            }
        case constants.FETCHED_MESSAGES:
            return {
                fetchedMessages: true,
                messages: [ ...action.friends ]
            }
        case constants.FETCHED_MESSAGES:
            return {
                fetchMessagesFail: true
            }
        default:
            return state
    }
}

export default messages;