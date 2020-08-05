import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBar from '../_components/TopBar';
import MessageTopBar from '../_components/MessageTopBar';
import MessageInput from '../_components/MessageInput';

class MessageScreen extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props)
        return (
            <div className="message_screen">
                <MessageTopBar history={this.props.history} />
                <MessageInput />
            </div>
        )
    }
}


const mapStateToprops = (state, ownProps) => {

    return {
        data: state.messages.messages[ownProps.match.params.id]
    }
}

// const mapDispatch = ()

const ConnectedMessageScreen = connect(mapStateToprops, null)(MessageScreen)

export { ConnectedMessageScreen as MessageScreen };