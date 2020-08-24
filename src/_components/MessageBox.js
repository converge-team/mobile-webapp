import React from 'react';

function MessageBox({ object }) {
    return (
        <div className={`message-box ${object.type === 'received' ? 'received' : ''}`}>
            <div className="message-content">
                <span>
                    {object.content}
                </span>
            </div>
        </div>
    );
}

export default MessageBox;