// ChatProvider.js
import React, { useState } from "react";
import ChatContext from "./ChatContext";
import ChatInterface from "./ChatInterface";

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentFriendMessage, setCurrentFriendMessage] = useState(null);
  const [initialFriendDetails, setInitialFriendDetails] = useState(null);
  const [createJourneyClickCount, setCreateJourneyClickCount] = useState(0);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [firstUserInput, setFirstUserInput] = useState("");

  const sendMessage = (message) => {
    setMessages([...messages, message]);
    if (message.sender === "friend") {
      setCurrentFriendMessage(message);
    }
  };

  const addMethodToSidebar = (method) => {
    if (!selectedMethods.includes(method)) {
      setSelectedMethods((prevMethods) => [...prevMethods, method]);
      setCreateJourneyClickCount((prevCount) => prevCount + 1);
    }
  };

  const handleDeleteMethod = (method) => {
    setSelectedMethods((prevMethods) =>
      prevMethods.filter((m) => m !== method)
    );
    setCreateJourneyClickCount((prevCount) => prevCount - 1);
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
        createJourneyClickCount,
        setCreateJourneyClickCount,
        selectedMethods,
        addMethodToSidebar,
        handleDeleteMethod,
        firstUserInput,
        setFirstUserInput,
      }}
    >
      {/* ... other components ... */}
      {/* <ChatInterface />    */}
      {/* ... other components ... */}
      {children}
    </ChatContext.Provider>
  );
};
