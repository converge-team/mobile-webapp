import React from 'react';
import TopBar from './TopBar';
import { Link } from 'react-router-dom';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapScreenToRoute = {
    home: () => '/',
    message_screen: (id) => `/message/${id}`
}

const SecondaryTopBar = ({
    history,
    match,
    screensLoaded,
    back,
    main,
    id,
    includeIcon
}) => {

    const goBack = () => history.go(-1);

    const StartIcon = ({ goBack }) => (
        <div className="icon_div start_icon" onClick={goBack}>
            <div className="touch_indicator">
                <i className="fas fa-chevron-left"></i>
            </div>
        </div>
    )

    return (
        <TopBar
            startIcon={
                screensLoaded[back]
                    ? <StartIcon goBack={goBack} />
                    : <Link style={{color: "#30f"}} to={mapScreenToRoute[back](id)}>
                          <StartIcon />
                      </Link>
            }
            main={
                main ? main :
                    <Link to={`/profile/${match.params.id}`}>
                        <div className="chat_box">
                            <div className="profile_picture_div">
                                <div className="img_cover">
                                    <img src="https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg" className="profile_img" />
                                </div>
                            </div>
                            <div className="info">
                                <div className="friend_name">
                                    <h3 className="friend_name">John Duff</h3>
                                </div>
                                <p className="last_message">Johnny</p>
                            </div>
                        </div>
                    </Link>
            }
            icons={
                includeIcon &&
                <div className="icon_div last_at_night">
                    <div className="touch_indicator">
                        <div className="grid_dock">
                            <div className="block"></div>
                            <div className="block"></div>
                            <div className="block"></div>
                            <div className="block"></div>
                        </div>
                    </div>
                </div>
            }
        />
    )
}

const mapStateToProps = state => {
    return {
        screensLoaded: state.screens
    }
}

const ConnectedSecondaryTopBar = compose(
    withRouter,
    connect(mapStateToProps, null)
)(SecondaryTopBar);

export default ConnectedSecondaryTopBar;