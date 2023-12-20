// ChatProvider.js
import React, { useState } from "react";
import ChatContext from "./ChatContext";
import ChatInterface from "./ChatInterface";

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentFriendMessage, setCurrentFriendMessage] = useState(null);
  const [initialFriendDetails, setInitialFriendDetails] = useState(null);

  const sendMessage = (message) => {
    setMessages([...messages, message]);
    if (message.sender === "friend") {
      setCurrentFriendMessage(message);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        currentFriendMessage,
        setCurrentFriendMessage,
        initialFriendDetails,
        setInitialFriendDetails,
      }}
    >
      {/* ... other components ... */}
      {/* <ChatInterface /> */}
      {/* ... other components ... */}
      {children}
    </ChatContext.Provider>
  );
};
