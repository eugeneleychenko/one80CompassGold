// ChatContext.js
import React from "react";

const ChatContext = React.createContext({
  messages: [],
  sendMessage: () => {},
  currentFriendMessage: null,
  setCurrentFriendMessage: () => {},
  initialFriendDetails: null,
  setInitialFriendDetails: () => {},
  createJourneyClickCount: 0,
  setCreateJourneyClickCount: () => {},
});

export default ChatContext;
