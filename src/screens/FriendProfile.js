
import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../_components/TopBar';
import ChatBox from '../_components/ChatBox';

class FriendProfile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { friend } = this.props;
        console.log(this.props)
        return (
            <div className="settings">
                <TopBar
                    startIcon={
                        <div className="icon_div start_icon" onClick={() => this.props.history.go(-1)}>
                            <div className="touch_indicator">
                                <i className="fas fa-chevron-left"></i>
                            </div>
                        </div>
                    }
                    main={
                        <h3 className="app-name">@{friend.username}</h3>
                    }
                />
                <ChatBox
                    img_src="https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg"
                    name={`${friend.first_name} ${friend.last_name}`}
                    lastMessage={`Online`}
                />
                <div className="user-info">
                    <div className="info-child only">
                        <p className="bold">+2348148243489</p>
                        <p className="light">Tap to change phone number</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        friend: state.messages.messages.find(person =>
            person._id == ownProps.match.params.id
        )
    }
}

const connectedFriendProfile = connect(mapStateToProps)(FriendProfile);

export { connectedFriendProfile as FriendProfile }