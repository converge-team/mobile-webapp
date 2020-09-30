import React, { Component } from 'react';
import SecondaryTopBar from '../_components/SecondaryTopBar';
import { connect } from 'react-redux';
import { changePhotoBlob, updatingProfile } from '../_actions/profile.actions'
import { logout } from '../_actions/auth.actions';

class Settings extends Component {

    render() {
        const { user, history, profilePicture, profileChangeState } = this.props;
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
                        <div 
                            className="img_cover"
                            onClick={() => history.push(`/your-photo`)}
                        >
                            {
                                profileChangeState === 'updating'
                                    ? <svg className="circle-loader progress" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="15" />
                                    </svg>
                                    : <img className="profile_img" src={profilePicture} alt="You" />

                            }
                        </div>
                    </div>
                    <div className="chatbox-other">
                        <div className="info">
                            <h3 className="friend_name">{`${user.first_name} ${user.last_name}`}</h3>
                            <p className="last_message" style={{ color: "rgba(0,0,0,.6)" }}>+2348148243489</p>
                        </div>
                    </div>
                    <label htmlFor="image" className="camera">
                        <i className="fas fa-camera"></i>
                    </label>
                    <input
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const url = URL.createObjectURL(file);
                            this.props.changeBlob({ url, type: file.type });
                            history.push('/change-photo');
                        }}
                        type="file"
                        id="image"
                        accept="image/webp, image/jpg, image/jpeg, image/png"
                    />
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
        user: state.auth.user,
        profilePicture: state.profile.profilePicture,
        profileChangeState: state.profile.profileChangeState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        changeBlob: (blob) => dispatch(changePhotoBlob(blob)),
    }
}

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);

export { ConnectedSettings as Settings };