import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllMessages } from '../_actions/message.actions';
import { screenLoaded } from '../_actions/screen.actions';

import TopBar from '../_components/TopBar';
import ChatBoxesCover from '../_components/ChatBoxesCover';
import Navigation from '../_components/Navigation';


const mainHeader = <h2 className="app_name">Converge</h2>
const icons = [
    <div key={0} className="icon_div">
        <div className="touch_indicator">
            <i className="fas fa-plus"></i>
        </div>
    </div>,
    <div key={1} className="icon_div">
        <div className="touch_indicator">
            <i className="fas fa-search"></i>
        </div>
    </div>,
    <div key={2} className="icon_div">
        <div className="touch_indicator">
            <div className="menu_bar">
                <div className="menu_line"></div>
                <div className="menu_line"></div>
                <div className="menu_line"></div>
            </div>
        </div>
    </div>
]

class HomeScreen extends Component {

    componentDidMount() {
        this.props.screenLoaded();
        this.props.fetchMessages();
    }

    render() {
        console.log(this.props);
        const align = {textAlign: "center", opacity: 0.6}
        return (
            <div>
                <TopBar
                    main={mainHeader}
                    icons={icons}
                />
                <Navigation />
                {
                    this.props.fetchedMessages
                        ? this.props.noMessages ?
                            <p style={align}>You don't have messages yet. Try searching for friends with the search button</p>
                            : <ChatBoxesCover persons={this.props.persons} />
                        : <p style={align}>Error while fetching messages</p>

                }
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return { ...state.messages }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMessages: () => dispatch(fetchAllMessages()),
        screenLoaded: () => dispatch((screenLoaded('home')))
    }
}

const connectedHomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export { connectedHomeScreen as HomeScreen };