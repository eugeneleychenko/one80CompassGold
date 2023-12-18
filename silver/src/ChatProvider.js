// ChatProvider.js
import React, { useState } from 'react';
import ChatContext from './ChatContext';

export const ChatProvider = ({ children }) => {
    
    const [messages, setMessages] = useState([]);
    const [userMessageCount, setUserMessageCount] = useState(0);

    const sendMessage = (message) => {
        setMessages([...messages, message]);
        // if (message.sender === 'user') {
        //     const newUserMessageCount = userMessageCount + 1;
        //     setUserMessageCount(newUserMessageCount);
        //     if (callback) {
        //         callback(newUserMessageCount);
        //     }
        // }
    };



    return (
        <ChatContext.Provider value={{ messages, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};