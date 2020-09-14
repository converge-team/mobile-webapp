import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { screenLoaded } from '../_actions/screen.actions';
import { removeMessageTag } from '../_actions/message.actions'

import TopBar from '../_components/TopBar';
import ChatBoxesCover from '../_components/ChatBoxesCover';
import Navigation from '../_components/Navigation';
import Icon from '../_components/Icon';
import ChatBox from '../_components/ChatBox';

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

    toggleMenu(truth) {
        this.setState({
            menuOpen: truth
        })
    }

    render() {
        const align = { textAlign: "center", opacity: 0.6 }
        const { name } = this.props;

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
                                onClick={() => this.toggleMenu(true)}
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

                <div className={`menu ${this.state.menuOpen ? 'open' : ''}`} >
                    <div className="closer" onClick={() => this.toggleMenu(false)}>

                    </div>
                    <div className="main">
                        <div className="top">
                            <Icon name="fas fa-chevron-right" onClick={() => this.toggleMenu(false)} />
                            <Icon name="fas fa-cog" push="/settings" />
                        </div>
                        <ChatBox
                            inMenu
                            notLink
                            img_src="https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg"
                            name={name}
                            lastMessage=''
                        />
                    </div>
                </div>

            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        name: `${state.auth.user.first_name} ${state.auth.user.last_name}`,
        ...state.messages
    }

}

const mapDispatchToProps = dispatch => {
    return {
        screenLoaded: () => dispatch((screenLoaded('home'))),
        removeTag: () => dispatch(removeMessageTag())
    }
}

const connectedHomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export { connectedHomeScreen as HomeScreen };