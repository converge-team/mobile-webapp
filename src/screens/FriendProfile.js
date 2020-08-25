
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import SecondaryTopBar from '../_components/SecondaryTopBar';
import ChatBox from '../_components/ChatBox';

class FriendProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        let { screens } = this.props;

        if (!screens.message_screen) {
            this.setState({
                redirect: true
            })
        }
    }

    render() {
        const { friend } = this.props;
        const { match } = this.props;

        return (
            !this.state.redirect ?
                <div className="settings">
                    <SecondaryTopBar
                        main={<h3 className="app-name">@{friend.username}</h3>}
                        back="message_screen"
                        id={this.props.match.params.id}
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
                : <Redirect to={`/message/${match.params.id}`} />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        friend: state.messages.persons.find(person =>
            person._id === ownProps.match.params.id
        ),
        screens: state.screens
    }
}

const connectedFriendProfile = connect(mapStateToProps)(FriendProfile);

export { connectedFriendProfile as FriendProfile }