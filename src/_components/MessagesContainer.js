import React from 'react';

import MessageBox from './MessageBox'

function MessagesContainer({ messages }) {


    const messageBoxes = messages.map(msg =>
        <MessageBox key={msg.time} object={msg} />
    )

    return (
        <div className="message-cover">
            <div className="messages-container">
                {messageBoxes}
            </div>
        </div>
    );
}

export default MessagesContainer;