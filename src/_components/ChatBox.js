import React from 'react';
import { Link } from 'react-router-dom';

function ChatBox(props) {
    console.log(props.new)
    return (
        <Link to={`message/${props.id}${props.new ? '?new=true' : ''}`}>
            <div className="chat_box">
                <div className="profile_picture_div">
                    <div className={`img_cover ${props.online ? 'online' : ''}`}>
                        <img className="profile_img" src={props.img_src} alt={`Profile for ${props.name}`} />
                    </div>
                </div>
                <div className="info">
                    <h3 className="friend_name">{props.name}</h3>
                    <p className="last_message">
                        {
                            props.typing
                                ? "typing..."
                                : props.lastMessage
                        }
                    </p>
                </div>
                <div className="indicators">
                    <span className="time_indicator">{props.lastMessageTime}</span>
                    {
                        props.unreadCount
                        && <div className="unread_indicator">
                            {props.unreadCount}
                        </div>
                    }
                </div>
            </div>
        </Link>

    )
}

export default ChatBox;