import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';


function ChatBox(props) {
    console.log(props.new)
    // const [pictureOpened, setPictureOpened] = useState(false);

    return (

        <div className={`chat_box ${props.inMenu ? 'in-menu' : ''}`}
            onClick={
                () =>
                    !props.notLink && props.history.push(`message/${props.id}${props.new ? '?new=true' : ''}`)
            }
        >
            <div className="profile_picture_div">
                <div 
                    className={`img_cover ${props.online ? 'online' : ''}`}
                    onClick={() => props.linkToPicture && props.history.push(`/photo/${props.linkToPicture}`)}
                >
                    <img className="profile_img" src={props.img_src} alt={`Profile for ${props.name}`} />
                </div>
            </div>
            <div className="chatbox-other">
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
        </div>
    )
}

export default withRouter(ChatBox);