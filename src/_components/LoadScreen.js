import React from 'react';

import logo from '../assets/images/logo.jpeg';

function LoadScreen({ homePage, error }) {

    return (
        <div className="load_screen">
            {
                error
                    ? <div className="centered column">
                        <i className="fas fa-exclamation-circle large-icon danger"></i>
                        <p>Something went wrong.</p>
                    </div>
                    : !homePage
                        ? <div className="spinner">
                            <div className="double-bounce"></div>
                            <div className="double-bounce"></div>
                        </div>
                        : <img src={logo} />
            }

        </div>
    )
}

export default LoadScreen;