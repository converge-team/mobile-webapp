import React, { useState, useRef } from 'react';
import { newMessage } from '../_actions/message.actions';
import { socket } from '../AppContainer';
import { connect } from 'react-redux';

function MessageInput({ person, dispatch }) {

    const [inputFocused, setFocus] = useState(false)
    const [messageValue, setMessageValue] = useState('');
    const inputRef = useRef(null);

    const { socketId } = person;

    // const [animate, setAnimate] = useState(false);

    // useEffect(() => {
    //     setAnimate(true);
    // })

    const handleFocus = (e) => {
        setFocus(true);
    }

    const handleBlur = (e) => {
        setFocus(false)
        // if (socketId)
        //     socket.emit('stop_typing', { socketId });
    }

    const handleChange = e => {
        setMessageValue(e.target.value);

        if (socketId)
            socket.emit('typing', { socketId });
    }

    const handleKeyUp = e => {
        const caught = e.target.value;

        setTimeout(() => {
            if(inputRef.current) {
                if (caught === inputRef.current.value) {

                    if (socketId)
                        socket.emit('stop_typing', { socketId });
                }
            }
        }, 1500);
    }

    const handleSubmit = e => {

        if (messageValue.length === 0) return;

        socket.emit('new_message', { toUser: person.username, socketId, message: messageValue });
        dispatch(newMessage(person._id, { content: messageValue, time: new Date(), type: 'sent' }));
        setMessageValue('');

    }

    return (
        <div className="message_input">
            <div className="message_input_form">
                <div className="padding">
                    <input
                        ref={inputRef}
                        onKeyUp={handleKeyUp}
                        value={messageValue}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="input_box"
                        placeholder="Type a message..."
                    />
                    {
                        !inputFocused && !messageValue &&

                        <div className="icons">
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
                        </div>
                    }
                </div>

                <div className="send" 
                    onClick={inputFocused || messageValue ? handleSubmit : () => null}
                >
                    {
                        inputFocused || messageValue
                            ? <i className="fas fa-paper-plane"></i>
                            : <i className="fas fa-microphone"></i>

                    }
                </div>
            </div>
        </div>
    )
}

const connectedMessageInput = connect(null)(MessageInput);

export default connectedMessageInput;