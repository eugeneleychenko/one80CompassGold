import React, { useContext, useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ChatInput } from "./ChatInput";
import ChatContext from "./ChatContext";
import { marked } from "marked";
import DOMPurify from "dompurify";

// Placeholder functions
const handleCreateJourneyClick = (methods) => {
  // TODO: Implement this function
};

const ChatInterface = () => {
  const {
    messages,
    sendMessage,
    initialFriendDetails,
    setInitialFriendDetails,
  } = useContext(ChatContext);
  const [hasUserSentFirstMessage, setHasUserSentFirstMessage] = useState(false);
  const [hasFriendResponded, setHasFriendResponded] = useState(false);

  // so Create a Journey appears once
  useEffect(() => {
    if (
      // hasFriendResponded &&
      messages.some((message) => message.sender === "friend")
    ) {
      setHasFriendResponded(true); // Set this to true after the first friend response
    }
  }, [messages]); // Depend on messages to trigger this effect

  // runs fetchFriendResponse
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === "user") {
      fetchFriendResponse(lastMessage.text);
    }
  }, [messages]);

  // Initial quesiton
  useEffect(() => {
    // Use the default message from ChatProvider's defaultMessages
    const defaultMessage = {
      text: "How can I help you with your user design problem today?",
      sender: "friend",
    };
    sendMessage(defaultMessage);
    // ... rest of your useEffect code
  }, []);

  // Saves friend response array
  useEffect(() => {
    // Find the first message from 'friend' with details and save it
    if (!initialFriendDetails) {
      const firstFriendMessageWithDetails = messages.find(
        (message) => message.sender === "friend" && message.details
      );
      if (firstFriendMessageWithDetails) {
        setInitialFriendDetails(firstFriendMessageWithDetails.details);
      }
    }
    // console.log("initialFriendDetails: ", initialFriendDetails);
  }, [messages, initialFriendDetails, setInitialFriendDetails]);

  const fetchFriendResponse = async (userInput) => {
    let url;
    let headers;
    let body;

    if (messages.filter((message) => message.sender === "friend").length > 1) {
      // Use the new API for subsequent messages
      url = "http://127.0.0.1:8000/stream_chat/";
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify({ content: userInput });
    } else {
      // Use the original API for the first message
      url = "https://one80-compass.vercel.app/find_closest_match";
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify({ user_input: userInput });
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (
        messages.filter((message) => message.sender === "friend").length > 1
      ) {
        // Handle the stream response for subsequent messages
        const reader = response.body.getReader();
        let friendMessageChunks = "";
        let messageKey = Date.now(); // Create a unique key for the message
        console.log("Stream reading initiated");

        // Add an initial message to indicate loading
        sendMessage({
          sender: "friend",
          text: "Loading...",
          key: messageKey,
        });

        reader
          .read()
          .then(function processText({ done, value }) {
            friendMessageChunks += new TextDecoder("utf-8").decode(value);
            console.log("Received chunk: ", friendMessageChunks);
            console.log(messages);
            // Added console.log for debugging
            // Update the existing message with the new chunk or the final content
            // sendMessage(friendMessageChunks);
            sendMessage((prevMessages) =>
              prevMessages.map((msg) =>
                msg.key === messageKey
                  ? {
                      ...msg,
                      text: marked(friendMessageChunks),
                    }
                  : msg
              )
            );

            if (!done) {
              // Continue reading the next chunk
              return reader.read().then(processText);
            }
          })
          .catch((error) => {
            console.error("Error sending message:", error);
            let friendMessageText =
              "Unable to send message. An error occurred.";
            // Update the existing message to show the error instead of adding a new one
            sendMessage((prevMessages) =>
              prevMessages.map((msg) =>
                msg.key === messageKey
                  ? { ...msg, text: friendMessageText }
                  : msg
              )
            );
          });
      } else {
        // Handle the JSON response for the first message
        const data = await response.json();
        if (data && data.closest_match) {
          const friendMessage = {
            text: data.closest_match,
            sender: "friend",
            details: {
              Methods: data.methods,
              Alternatives: data.alternatives,
              AI_responses: data.alternatives.map((alt) => {
                return Object.values(alt)[0]["AI Response"];
              }),
            },
          };
          sendMessage(friendMessage);
        }
      }
    } catch (error) {
      console.error("Failed to fetch friend response:", error);
    }
  };

  return (
    <>
      <Grid container sx={{ height: "100%", position: "relative" }}>
        <Grid
          item
          xs={12}
          sx={{
            height: "calc(100% - 80px)",
            overflowY: "auto",
            paddingBottom: "180px",
          }}
        >
          <List sx={{ padding: 0 }}>
            {messages.map((message, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    justifyContent:
                      message.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "10px",
                      maxWidth: "75%",
                      width: "75%",
                      backgroundColor:
                        message.sender === "user" ? "#e0f7fa" : "#fff",
                      marginLeft: message.sender === "user" ? "auto" : 0,
                      marginRight: message.sender === "friend" ? "auto" : 0,
                    }}
                  >
                    {message.sender === "friend" ? (
                      message.details && message.details.AI_responses ? (
                        message.details.AI_responses.map((response, idx) => (
                          <React.Fragment key={idx}>
                            <Typography variant="body1">{response}</Typography>
                            {idx < message.details.AI_responses.length - 1 && (
                              <br />
                            )}
                          </React.Fragment>
                        ))
                      ) : (
                        <Typography variant="body1">{message.text}</Typography>
                      )
                    ) : (
                      <Typography variant="body1">{message.text}</Typography>
                    )}
                  </Paper>
                </ListItem>
                {message.sender === "friend" &&
                  message.details &&
                  messages
                    .filter((msg) => msg.sender === "friend")
                    .indexOf(message) === 1 && (
                    <ListItem sx={{ justifyContent: "flex-start" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          handleCreateJourneyClick(message.details.Methods)
                        }
                      >
                        Create Custom Journey from Answer
                      </Button>
                    </ListItem>
                  )}
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        >
          <ChatInput style={{ width: "100%" }} />
        </Grid>
      </Grid>
    </>
  );
};
export default ChatInterface;
