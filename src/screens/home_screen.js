import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { screenLoaded } from '../_actions/screen.actions';
import { removeMessageTag } from '../_actions/message.actions'

import TopBar from '../_components/TopBar';
import ChatBoxesCover from '../_components/ChatBoxesCover';
import Navigation from '../_components/Navigation';
import Icon from '../_components/Icon';

const mainHeader = <h2 className="app_name">Converge</h2>

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false
        }

        this.toggleMenu = this.toggleMenu.bind(this)
    }

    componentDidMount() {
        this.props.screenLoaded();
        this.props.removeTag();
    }

    toggleMenu() {
        this.setState(({ menuOpen }) => ({
            menuOpen: !menuOpen
        }))
    }

    render() {
        console.log(this.props);
        const align = { textAlign: "center", opacity: 0.6 }
        return (
            <div>
                <TopBar
                    main={mainHeader}
                    icons={
                        [
                            <Icon key={0} name="fas fa-plus" />,
                            <Icon key={1} name="fas fa-search" push="/search" />,
                            <Icon
                                key={2}
                                onClick={this.toggleMenu}
                                child={
                                    <div className="menu_bar">
                                        <div className="menu_line"></div>
                                        <div className="menu_line"></div>
                                        <div className="menu_line"></div>
                                    </div>
                                }
                            />
                        ]
                    }
                />
                <Navigation />
                {
                    this.props.fetchedMessages
                        ? this.props.noMessages ?
                            <p style={align}>You don't have messages yet. Try searching for friends with the search button</p>
                            : <ChatBoxesCover persons={this.props.persons} />
                        : <p style={align}>Error while fetching messages</p>

                }
                {
                    this.state.menuOpen &&
                    <div className="menu">
                        <div className="closer" onClick={this.toggleMenu}>

                        </div>
                        <div className="main">

                        </div>
                    </div>
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
        screenLoaded: () => dispatch((screenLoaded('home'))),
        removeTag: () => dispatch(removeMessageTag())
    }
}

const connectedHomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export { connectedHomeScreen as HomeScreen };