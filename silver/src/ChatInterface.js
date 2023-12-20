import React, { useContext, useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ChatInput } from "./ChatInput";
import ChatContext from "./ChatContext";

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
  // const [initialFriendDetails, setInitialFriendDetails] = useState(null);

  useEffect(() => {
    if (
      hasFriendResponded &&
      messages.some((message) => message.sender === "friend")
    ) {
      setHasFriendResponded(true); // Set this to true after the first friend response
    }
  }, [messages]); // Depend on messages to trigger this effect

  useEffect(() => {
    if (
      !hasUserSentFirstMessage &&
      messages.some((message) => message.sender === "user")
    ) {
      const firstUserMessage = messages.find(
        (message) => message.sender === "user"
      );
      fetchFriendResponse(firstUserMessage.text);
      setHasUserSentFirstMessage(true); // Set this to true so it doesn't run again
    }
  }, [hasUserSentFirstMessage, messages]); //

  useEffect(() => {
    // Use the default message from ChatProvider's defaultMessages
    const defaultMessage = {
      text: "How can I help you with your user design problem today?",
      sender: "friend",
    };
    sendMessage(defaultMessage);
    // ... rest of your useEffect code
  }, []);

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
    try {
      const response = await fetch("http://0.0.0.0:8000/find_closest_match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_input: userInput,
        }),
      });
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
        // console.log(friendMessage)
        sendMessage(friendMessage);
        // console.log(friendMessage);
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
                  !hasFriendResponded && (
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
