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
                fetchedMessagesForPerson: null,
                fetchingMessages: false,
                fetchedMessages: true,
                persons: action.persons
            }
        case messageConstants.FETCHED_FRIEND_MESSAGES:
            return {
                fetchedMessages: true,
                fetchedMessagesForPerson: action.friend._id,
                persons: state.persons.find(person => person._id === action.friend._id)
                    ? state.persons.map(friend =>
                        friend._id === action.friend._id ? { ...friend, messages: action.friend.messages, typing: false } : friend
                    ) : [...state.persons, { ...action.friend, typing: false }]
            };

        case messageConstants.REMOVE_TAG:
            return {
                ...state,
                fetchedMessagesForPerson: null
            }
        case messageConstants.NEW_MESSAGE:
            return {
                ...state,
                persons: state.persons.map(person =>
                    person._id === action.userId
                        ? { ...person, messages: [...person.messages, action.msgObj] }
                        : person
                )
            };
        case messageConstants.NEW_FRIEND_PROFILE_PHOTO:
            return {
                ...state,
                persons: state.persons.map(person => (
                    person._id === action.from ? { ...person, profile_photo: action.url } : person
                ))
            }
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
                ...state,
                fetchedMessages: false,
                fetchingMessages: false,
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