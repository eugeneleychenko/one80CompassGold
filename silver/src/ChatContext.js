// ChatContext.js
import React from "react";

const ChatContext = React.createContext({
  messages: [],
  sendMessage: () => {},
  currentFriendMessage: null,
  setCurrentFriendMessage: () => {},
  initialFriendDetails: null,
  setInitialFriendDetails: () => {},
});

export default ChatContext;
