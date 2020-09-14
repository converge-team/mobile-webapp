import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { socket } from '../AppContainer';
import parseDate from '../utils/parseDate';
import query from '../utils/query';

import { userOnline, userOffline, fetchMessageForFriend, addFriend } from '../_actions/message.actions';
import { screenLoaded } from '../_actions/screen.actions';
import LoadScreen from '../_components/LoadScreen';

import MessagesContainer from '../_components/MessagesContainer';
import SecondaryTopBar from '../_components/SecondaryTopBar';
import MessageInput from '../_components/MessageInput';

class MessageScreen extends Component {

    componentDidMount() {
        const { dispatch, match, location, data } = this.props;
        
        console.log('data for unconfirmed: ', data);

        dispatch(screenLoaded('message_screen'));
        
        if(data && data.unconfirmed) {
            dispatch(addFriend(match.params.id));
        } else if (query('new', location.search) !== 'true') {
            dispatch(fetchMessageForFriend(match.params.id));
        } else {
            dispatch(addFriend(match.params.id));
        }

    }

    componentDidUpdate() {
        const { dispatch } = this.props;
        const { fetchedMessagesForPerson, match } = this.props;

        if (fetchedMessagesForPerson === match.params.id) {
            const { data } = this.props;

            if (data.socketId) 
                socket.emit('join', { friend: data.username, socketId: data.socketId });

            if (!data.socketId && !data.lastSeen) {
                console.log('data.socket: ', data.socketId);
                socket.emit('bring_status',
                    { username: data.username },
                    (status) => {
                        console.log('status: ', status)
                        if (status.id)
                            dispatch(userOnline(status));
                        else
                            dispatch(userOffline(status))
                    }
                )
            }
        }
    }

    render() {
        const { fetchedMessagesForPerson, fetchingMessages, fetchMessagesFail } = this.props;
        const { id } = this.props.match.params;
        const { data } = this.props;

        // console.log('data.message: ', data.messages);
        return (
            <div className="message_screen">
                {
                    fetchingMessages &&
                    <LoadScreen />
                }

                {fetchedMessagesForPerson === id &&
                    <div className="full">
                        <SecondaryTopBar
                            includeIcon={true}
                            match={this.props.match}
                            back="home"
                            main={
                                <Link to={`/profile/${this.props.match.params.id}`}>
                                    <div className="chat_box">
                                        <div className="profile_picture_div">
                                            <div className="img_cover">
                                                <img src="https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg" className="profile_img" alt={`${data.username}`} />
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="friend_name">
                                                <h3 className="friend_name">{`${data.first_name} ${data.last_name}`}</h3>
                                            </div>
                                            <p className="last_message">
                                                {data.typing ?
                                                    "typing..."
                                                    : data.socketId
                                                        ? "online"
                                                        : data.lastSeen
                                                            ? `last seen ${parseDate(data.lastSeen).prefixTime}`
                                                            : ''
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            }
                        />
                        <MessagesContainer messages={data.messages} />
                        <MessageInput person={data} />
                    </div>
                }
                {fetchMessagesFail &&
                    <div>
                        <h1 style={{ textAlign: 'center' }}>Error Fetching</h1>
                    </div>
                }

            </div>
        )
    }
}

const mapStateToprops = (state, ownProps) => {

    return {
        ...state.messages,
        data: state.messages.persons && state.messages.persons.find(person => {

            return person._id === ownProps.match.params.id
        }),
        screensLoaded: state.screens
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         screenLoaded: () => dispatch(screenLoaded('message_screen'))
//     }
// }

// const mapDispatch = ()

const ConnectedMessageScreen = connect(mapStateToprops)(MessageScreen);

export { ConnectedMessageScreen as MessageScreen };