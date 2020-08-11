import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllMessages } from '../_actions/actions';

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
    <div key={2}className="icon_div">
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
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        this.props.fetchMessages();
    }

    render() {
        return(
            <div>
                <TopBar
                    main={mainHeader}
                    icons={icons}
                />
                <Navigation />
                <ChatBoxesCover persons={this.props.messages}/>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return { ...state.messages }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMessages: () => dispatch(fetchAllMessages())
    }
}

const connectedHomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export { connectedHomeScreen as HomeScreen };