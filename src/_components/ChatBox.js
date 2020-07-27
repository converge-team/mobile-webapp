import React, { Component } from 'react';

class ChatBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="chat_box">
                <div className="profile_picture_div">
                    <div className={`img_cover ${this.props.online ? 'online' : ''}`}>
                        <img className="profile_img" src={this.props.img_src}/>
                    </div>
                </div>
                <div className="info">
                    <h3 className="friend_name">{this.props.name}</h3>
                     <p className="last_message">{this.props.lastMessage}</p>
                </div>
                <div className="indicators">
                    <span className="time_indicator">{this.props.lastMessageTime}</span>
                    <div className="unread_indicator">
                        {this.props.unreadCount}
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatBox;