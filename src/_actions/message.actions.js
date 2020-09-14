
import service from '../_services/services';

export const messageConstants = {
    FETCHING_MESSAGES: 'FETCHING_MESSAGES',
    FETCHED_MESSAGES: 'FETCHED_MESSAGES',
    FETCHED_MESSAGES_FAIL: 'FETCHED_MESSAGES_FAIL',
    NO_MESSAGE: 'NO_MESSAGE',
    NEW_MESSAGE: 'NEW_MESSAGE',
    TYPING: 'TYPING',
    STOP_TYPING: 'STOP_TYPING',
    USER_ONLINE: 'USER_ONLINE',
    USER_OFFLINE: 'USER_OFFLINE',
    FETCHED_FRIEND_MESSAGES: 'FETCHED_FRIEND_MESSAGES',
    ADD_FRIEND: 'ADD_FRIEND',
    REMOVE_TAG: 'REMOVE_TAG'
}


const fetchingMessages = () => {
    return {
        type: messageConstants.FETCHING_MESSAGES
    }
}

const fetchedMessages = (persons) => {
    return {
        type: messageConstants.FETCHED_MESSAGES,
        persons
    }
}

export const fetchedMessageForFriend = (friend) => {
    return {
        type: messageConstants.FETCHED_FRIEND_MESSAGES,
        friend
    }
}

export const typing = (username) => {
    return {
        type: messageConstants.TYPING,
        username
    }
}

export const stopTyping = (username) => {
    return {
        type: messageConstants.STOP_TYPING,
        username
    }
}

export const userOnline = ({username, id}) => {
    return {
        type: messageConstants.USER_ONLINE,
        username,
        id
    }
}

export const userOffline = ({username, time}) => {
    return {
        type: messageConstants.USER_OFFLINE,
        username,
        time
    }
}

export const newMessage = (userId, msgObj) => {
    return {
        type: messageConstants.NEW_MESSAGE,
        userId,
        msgObj
    }
}

const messageFetchFail = () => {
    return {
        type: messageConstants.FETCHED_MESSAGES_FAIL
    }
}

export const removeMessageTag = () => {
    return {
        type: messageConstants.REMOVE_TAG
    }
}

const noMessage = () => {
    return {
        type: messageConstants.NO_MESSAGE
    }
}

export const fetchAllMessages = () => {
    return dispatch => {
        dispatch(fetchingMessages());

        service.message.getFriendsAndMessage()
            .then(persons => {
                dispatch(fetchedMessages(persons))
            })
            .catch(error => {
                console.log(error.message)
                if (error.message === "No_Messages")
                    return dispatch(noMessage());
                else
                    dispatch(messageFetchFail());
                // console.log('error while fetching messages')
            });
    }
}

export const fetchMessageForFriend = (id) => {
    return dispatch => {
        dispatch(fetchingMessages());
        service.message.getMessagesForFriend(id)
            .then(messages => {
                dispatch(fetchedMessageForFriend(messages));
            })
            .catch(error => {
                console.log('error; ', error)
                dispatch(messageFetchFail());
            })

    }
}

export const addFriend = id => {
    return dispatch => {
        dispatch(fetchingMessages());
        service.message.searchDetails(id)
            .then(friend => {
                dispatch(fetchedMessageForFriend({...friend, messages: [], unconfirmed: true}));
                return friend;
            })
            .catch(error => {
                dispatch(messageFetchFail());
            })
    }
} 