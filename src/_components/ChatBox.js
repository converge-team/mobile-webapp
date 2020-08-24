import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChatBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link to={`message/${this.props.id}`}>
                <div className="chat_box">
                    <div className="profile_picture_div">
                        <div className={`img_cover ${this.props.online ? 'online' : ''}`}>
                            <img className="profile_img" src={this.props.img_src} />
                        </div>
                    </div>
                    <div className="info">
                        <h3 className="friend_name">{this.props.name}</h3>
                        <p className="last_message">
                            {
                                this.props.typing
                                ? "typing..."
                                : this.props.lastMessage
                            }
                        </p>
                    </div>
                    <div className="indicators">
                        <span className="time_indicator">{this.props.lastMessageTime}</span>
                        {
                            this.props.unreadCount
                            && <div className="unread_indicator">
                                {this.props.unreadCount}
                            </div>
                        }
                    </div>
                </div>
            </Link>

        )
    }
}

export default ChatBox;