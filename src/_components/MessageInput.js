import React, { useState, useEffect } from 'react';


function MessageInput(props) {

    const [ inputFocused, setState ] = useState()

    const handleFocus = (e) => {
        
    }

    return (
        <div className="message_input">
            <form className="message_input_form">
                <input onClick={handleFocus} className="input_box" placeholder="Type a message..."/>
                <div className="icon_div">
                    <div className="touch_indicator">
                        <i className="fas fa-plus"></i>
                    </div>
                </div>
                <div className="icon_div">
                    <div className="touch_indicator">
                        <i className="fas fa-grin"></i>
                    </div>
                </div>
                <div className="icon_div">
                    <div className="touch_indicator">
                        <i className="fas fa-dice-one"></i>
                    </div>
                </div>
            </form>
        </div>
    )
}



export default MessageInput;