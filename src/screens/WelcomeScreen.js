import React from 'react';
import { Link } from 'react-router-dom';

function WelcomeScreen() {
    return (
        <div className="welcome_screen">
            <div className="top">
                <h3 className="app_name">Converge</h3>
            </div>
            <div className="bottom">
                <div className="about">
                    <h2>Private Messaging</h2>
                    <p>
                        Message friends and family with ease. You have the option of
                        being accessible by the world or keeping it private.
                    </p>
                </div>
                <div className="action_btns">
                    <Link to="/login">
                        <button className="white">Log In</button>
                    </Link>
                    <Link to="/signup">
                        <button className="transparent">Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default WelcomeScreen;