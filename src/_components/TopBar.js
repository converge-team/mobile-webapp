
import React, { Component } from 'react';

class TopBar extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const icons = this.props.icons;
        return (
            <div className="top_bar">
                { this.props.startIcon }
                <div className="app_name_container">
                    {this.props.main}
                </div>
                <div className="icons last_at_right">
                    {icons}
                </div>
            </div>
        );
    }
}

export default TopBar;