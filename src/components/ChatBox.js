import React, { Component } from 'react';
import '../styles/chatBox.css';

class ChatBox extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="chat_box">
        <header className="message-preview-header">
          <figure className="dp">
            <img src="https://cdn.glitch.com/123f430f-285c-453f-92f6-fafb90a3db26%2FIMG_3661.JPG?v=1593993229725" alt="user.name"></img>
          </figure>
          <div className="message-preview">
            <h4 className="profile-name">Janette Webb</h4>
            <p className="latest-message">
              What's the real deal???
            </p>
          </div>
        </header>
        <div className="message-info">
          <span className="message-tme">16:04</span>
          <span className="message-count">2</span>
        </div>
      </div>
    );
  }
}

export default ChatBox;