
import React from 'react';

function TopBar({ icons, startIcon, main }) {

    return (
        <div className="top_bar">
            {startIcon}
            <div className="app_name_container">
                {main}
            </div>
            <div className="icons last_at_right">
                {icons}
            </div>
        </div>
    );
}

export default TopBar;