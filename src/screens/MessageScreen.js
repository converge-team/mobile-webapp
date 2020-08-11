import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBar from '../_components/TopBar';
import SecondaryTopBar from '../_components/SecondaryTopBar';
import MessageInput from '../_components/MessageInput';
import { screenLoaded } from '../_actions/actions';

class MessageScreen extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log(this.props)
        this.props.screenLoaded();
    }

    render() {
        console.log(this.props)
        return (
            <div className="message_screen">
                <SecondaryTopBar 
                    includeIcon={true}
                    match={this.props.match}
                    back="home"
                />
                <MessageInput />
            </div>
        )
    }
}


const mapStateToprops = (state, ownProps) => {

    return {
        data: state.messages.messages[ownProps.match.params.id],
        screensLoaded: state.screens
    }
}

const mapDispatchToProps = dispatch => {
    return {
        screenLoaded: () => dispatch(screenLoaded('message_screen'))
    }
}

// const mapDispatch = ()

const ConnectedMessageScreen = connect(mapStateToprops, mapDispatchToProps)(MessageScreen);

export { ConnectedMessageScreen as MessageScreen };