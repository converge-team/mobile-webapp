import React, { useState, useEffect } from 'react';


function MessageInput(props) {

    const [inputFocused, setFocus] = useState(false)
    // const [animate, setAnimate] = useState(false);

    // useEffect(() => {
    //     setAnimate(true);
    // })

    const handleFocus = (e) => {
        setFocus(true);
    }

    const handleBlur = (e) => {
        setFocus(false)
    }

    return (
        <div className="message_input">
            <form className="message_input_form">
                <input onFocus={handleFocus} onBlur={handleBlur} className="input_box" placeholder="Type a message..." />
                {
                    inputFocused
                        ? <div className="icon_div">
                            <div className="touch_indicator">
                                <i className="fas fa-paper-plane"></i>
                            </div>
                        </div>
                        : <div className="icons">
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
                        </div>
                }
            </form>
        </div>
    )
}



export default MessageInput;