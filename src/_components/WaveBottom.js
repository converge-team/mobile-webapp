import React from 'react';
import { Link } from 'react-router-dom';

function WaveBottom({ text }) {
    let textArray = text.split(' ');

    return (
        <div className="wave-bottom">
            <div className="top">
                <Link to="/welcome">
                    <div className="icon_div start_icon">
                        <div className="touch_indicator">
                            <i className="fas fa-chevron-left"></i>
                        </div>
                    </div>
                </Link>
            </div>
            <h1>
                {textArray[0]}
                <br />
                {textArray[1]}
            </h1>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#0099ff" fill-opacity="1" d="M0,192L60,181.3C120,171,240,149,360,149.3C480,149,600,171,720,192C840,213,960,235,1080,240C1200,245,1320,235,1380,229.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
            </svg> */}
        </div>
    );
}

export default WaveBottom;