import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessageScreen extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="top_bar">
                <div className="icon_div start_icon">
                    <div className="touch_indicator">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                </div>
                <div className="app_name_container">
                    <h2 className="app_name">Converge</h2>
                </div>
                <div className="icons">
                    <div className="icon_div last_at_right">
                        <div className="touch_indicator">
                            <i className="fas fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MessageScreen;