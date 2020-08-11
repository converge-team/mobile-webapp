import React from 'react';
import ChatBox from './ChatBox';

const ChatBoxesCover = ({ persons }) => {

    const messageBoxes = persons.map(person => {
        
        let lastMessage = person.lastMessage //e.g person['jeff'].messages
        let lastMessageTime = new Date(lastMessage.time);
        let dateDifference = new Date().getDay() - lastMessageTime.getDay(); // check difference in date
        return (
            <ChatBox 
                key={person._id}
                img_src="https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg"
                name={`${person.first_name} ${person.last_name}`}
                lastMessage={`${lastMessage.content}`}
                id={person._id}
                lastMessageTime={
                    dateDifference == 0
                    ? `${lastMessageTime.getHours()}:${lastMessageTime.getMinutes()}`
                    : dateDifference === 1 
                    ? 'Yesterday'
                    : `${lastMessageTime.getDate()}/${lastMessageTime.getMonth()+1}/${lastMessageTime.getFullYear()}`
                }
                unreadCount={2}
                online={true}
            />
        )
    });

    return (
        <div className="chat_boxes_cover">
            {messageBoxes}
        </div>
    )
}

export default ChatBoxesCover;