import React, { Component } from 'react';
import SecondaryTopBar from '../_components/SecondaryTopBar';
import { connect } from 'react-redux';
import { logout } from '../_actions/actions'
import ChatBox from '../_components/ChatBox';

class Settings extends Component {
    constructor(props) {
        super(props)
    }

    // componentDidMount() {
    //     console.log(this.props.user);
    // }

    render() {
        const { user } = this.props;
        return (
            <div className="settings">
                <SecondaryTopBar
                    main={
                        <h3 className="app-name">@{user.username}</h3>
                    }
                    back="home"
                />

                {/* the chat box here was borrowed from the main chat box
                   cause they serve the same UI purpose
                */}

                <div className="chat_box">
                    <div className="profile_picture_div">
                        <div className="img_cover">
                            <img className="profile_img" src="https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg" />
                        </div>
                    </div>
                    <div className="info">
                        <h3 className="friend_name">{`${user.first_name} ${user.last_name}`}</h3>
                        <p className="last_message" style={{ color: "rgba(0,0,0,.6)" }}>+2348148243489</p>
                    </div>
                    <div className="camera" onClick={() => console.log('clicked')}>
                        <i className="fas fa-camera"></i>
                    </div>
                </div>
                <div className="user-info">
                    <h3>Account</h3>
                    <div className="info-child">
                        <p className="bold">+2348148243489</p>
                        <p className="light">Tap to change phone number</p>
                    </div>
                    <div className="info-child">
                        <p className="bold">@{user.username}</p>
                        <p className="light">Username</p>
                    </div>
                    <div className="info-child">
                        <p className="bold">I'm a Frontend Developer from Converge </p>
                        <p className="light">Bio</p>
                    </div>
                </div>
                <div className="user-info">
                    <button className="danger" 
                        onClick={() => {
                            this.props.logout();
                            window.location.reload(false);
                        }}
                    >Logout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);

export { ConnectedSettings as Settings };