import { messageConstants } from '../_actions/message.actions';

const initialMessagesState = {
    fetchedMessages: false,
    persons: [],
};

const messages = (state = initialMessagesState, action) => {

    console.log(action)
    switch (action.type) {
        case messageConstants.FETCHING_MESSAGES:
            return {
                ...state,
                fetchingMessages: true,
            }
        case messageConstants.FETCHED_MESSAGES:
            return {
                ...state,
                fetchingMessages: false,
                fetchedMessages: true,
                persons: action.persons.map(person => {
                    return { 
                        ...state.persons.find(individual => individual._id === person._id), 
                        ...person, 
                        typing: false
                    }
                })
            }
        case messageConstants.FETCHED_FRIEND_MESSAGES:
            return {
                fetchedMessages: true,
                fetchedMessagesForPerson: action.friend._id,
                persons: state.persons.find(person => person._id === action.friend._id)
                    ? state.persons.map(friend =>
                        friend._id == action.friend._id ? { ...friend, messages: action.friend.messages, typing: false } : friend
                    ) : [...state.persons, { ...action.friend, typing: false, lastMessage: action.friend.messages[action.friend.messages.length - 1] }]
            };
        case messageConstants.NEW_MESSAGE:
            return {
                ...state,
                persons: state.persons.map(person =>
                    person.username === action.username
                        ? { ...person, messages: [action.msgObj, ...person.messages] }
                        : person
                )
            };
        case messageConstants.TYPING:
            return {
                ...state,
                persons: state.persons.map(person => (
                    person.username === action.username ? { ...person, typing: true } : person
                ))
            }
        case messageConstants.STOP_TYPING:
            return {
                ...state,
                persons: state.persons.map(person => (
                    person.username === action.username ? { ...person, typing: false } : person
                ))
            }
        case messageConstants.USER_ONLINE:
            return {
                ...state,
                persons: state.persons &&   state.persons.map(person => (
                    person.username === action.username
                        ? { ...person, socketId: action.id }
                        : person
                ))
            }
        case messageConstants.USER_OFFLINE:
            return {
                ...state,
                persons: state.persons && state.persons.map(person => (
                    person.username === action.username
                        ? { ...person, socketId: null, lastSeen: action.time }
                        : person
                ))
            }
        case messageConstants.FETCHED_MESSAGES_FAIL:
            return {
                fetchMessagesFail: true
            }
        case messageConstants.NO_MESSAGE:
            return {
                fetchedMessages: true,
                noMessages: true,
                persons: []
            }
        default:
            return state
    }
}

export default messages;