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
import { useNavigate } from "react-router-dom";

const matchEndpoint = "match-oeed.onrender.com";
const gptEndpoint = "gpt-upg8.onrender.com";
//const gptEndpoint = "0.0.0.0:8003";

const ChatInterface = () => {
  const {
    messages,
    sendMessage,
    initialFriendDetails,
    setInitialFriendDetails,
    createJourneyClickCount,
    setCreateJourneyClickCount,
    addMethodToSidebar,
    setFirstUserInput,
  } = useContext(ChatContext);
  const [hasUserSentFirstMessage, setHasUserSentFirstMessage] = useState(false);
  const [hasFriendResponded, setHasFriendResponded] = useState(false);
  const [friendMessageChunks, setFriendMessageChunks] = useState("");
  const [selectedMethods, setSelectedMethods] = useState([]);

  // so 'Create a Journey' appears once
  useEffect(() => {
    if (
      // hasFriendResponded &&
      messages.some((message) => message.sender === "friend")
    ) {
      setHasFriendResponded(true); // Set this to true after the first friend response
    }
    // console.log(messages);
  }, [messages]); // Depend on messages to trigger this effect

  // runs fetchFriendResponse
  useEffect(() => {
    console.log("Messages:", messages);
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === "user") {
      fetchFriendResponse(lastMessage.text);
    }
  }, [messages]);
  // Initial question
  useEffect(() => {
    if (messages.length === 0) {
      // Use the default message from ChatProvider's defaultMessages
      const defaultMessage = {
        text: "How can I help you with your user design problem today?",
        sender: "friend",
      };
      sendMessage(defaultMessage);
    }
    // ... rest of your useEffect code
  }, [messages]);

  //Saves the first user message
  useEffect(() => {
    // Check if there's at least one user message and if the first user input has not been set
    const firstUserMessage = messages.find(
      (message) => message.sender === "user"
    );
    if (firstUserMessage && !hasUserSentFirstMessage) {
      setHasUserSentFirstMessage(true);
      setFirstUserInput(firstUserMessage.text); // Save the first user input
    }
  }, [messages, hasUserSentFirstMessage, setFirstUserInput]);

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

  const handleMethodToSidebar = (method) => {
    addMethodToSidebar(method);
  };

  console.log("initialFriendDetails: ", initialFriendDetails);

  // Collect and format the conversation history
  const formattedHistory = messages
    .map((message, index) => {
      // Check if it's the third message and if it has details.AI_responses
      if (index === 2 && message.details && message.details.AI_responses) {
        // Map through the AI_responses and format them
        return message.details.AI_responses.map(
          (response, idx) => `AI Response ${idx + 1}: ${response}`
        ).join("\n");
      } else {
        // Format each message as "Human: <message>" or "AI: <message>"
        return `${message.sender === "user" ? "Human" : "AI"}: ${message.text}`;
      }
    })
    .join("\n");

  const extractMarkedPhrase = (text) => {
    const match = text.match(/\*\*(.*?)\*\*/);
    console.log(`extractMarkedPhrase - match:`, match);
    return match ? match[1] : null;
  };

  const fetchFriendResponse = async (userInput) => {
    let url;
    let headers;
    let body;
    const friendMessagesCount = messages.filter(
      (message) => message.sender === "friend"
    ).length;

    // Determine the API endpoint and request body based on the number of friend messages
    if (friendMessagesCount > 1) {
      // Use the new API for subsequent messages
      // use http when using localhost
      url = `http://${gptEndpoint}/stream_chat/`;
      //use https when using Render
      // url = `https://${gptEndpoint}/stream_chat/`;
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify({ content: userInput, history: formattedHistory });
    } else {
      // Use the original API for the first message
      url = `https://${matchEndpoint}/find_closest_match/`;
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

      // Check if the response is a ReadableStream and handle accordingly
      if (response.body instanceof ReadableStream && friendMessagesCount > 1) {
        const reader = response.body.getReader();
        let friendMessageText = ""; // Initialize the variable to hold the message text

        reader
          .read()
          .then(function processText({ done, value }) {
            if (value) {
              const chunk = new TextDecoder("utf-8").decode(value);
              friendMessageText += chunk; // Append the new chunk to the message text
              console.log("Received chunk: ", chunk); // Log the received chunk
              setFriendMessageChunks(friendMessageText); // Update the state with the new text
            }

            if (!done) {
              // Continue reading the next chunk
              return reader.read().then(processText);
            } else {
              setFriendMessageChunks("");
              const defaultMessage = {
                text: friendMessageText,
                sender: "friend",
              };
              sendMessage(defaultMessage);
            }
          })
          .catch((error) => {
            console.error("Error sending message:", error);
            friendMessageText = "Unable to send message. An error occurred."; // Set error message
            setFriendMessageChunks(friendMessageText); // Update the state with the error message
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
      <Grid container sx={{ height: "100vh", position: "relative" }}>
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
                {message.sender === "friend" &&
                message.details &&
                message.details.AI_responses ? (
                  message.details.AI_responses.map((response, idx) => (
                    <React.Fragment key={idx}>
                      <ListItem
                        sx={{
                          justifyContent: "flex-start",
                        }}
                      >
                        <Paper
                          elevation={3}
                          sx={{
                            padding: "10px",
                            maxWidth: "75%",
                            backgroundColor: "#fff",
                            marginLeft: 0,
                            marginRight: "auto",
                          }}
                        >
                          <Typography variant="body1">{response}</Typography>
                        </Paper>
                      </ListItem>
                      <ListItem sx={{ justifyContent: "flex-start" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            handleMethodToSidebar(message.details.Methods[idx])
                          }
                        >
                          Add {initialFriendDetails?.Methods[idx]} to Custom
                          Journey
                        </Button>
                      </ListItem>
                    </React.Fragment>
                  ))
                ) : (
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
                      <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(marked(message.text)),
                        }}
                      />
                    </Paper>
                  </ListItem>
                )}
                {/* {message.sender === "friend" &&
                  message.details &&
                  messages
                    .filter((msg) => msg.sender === "friend")
                    .indexOf(message) === 1 && (
                    <ListItem sx={{ justifyContent: "flex-start" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCreateJourneyClick}
                      >
                        Add Method to Custom Journey
                      </Button>
                    </ListItem>
                  )} */}

                {message.sender === "friend" &&
                message.text.includes(
                  "As per your request for an alternative"
                ) ? (
                  <React.Fragment>
                    <ListItem sx={{ justifyContent: "flex-start" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          const phrase = extractMarkedPhrase(message.text);
                          if (phrase) {
                            handleMethodToSidebar(phrase);
                          }
                        }}
                      >
                        Add {extractMarkedPhrase(message.text)} to Custom
                        Journey
                      </Button>
                    </ListItem>
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            ))}
            {/* Display the friend message chunks if they exist */}
            {friendMessageChunks && (
              <ListItem sx={{ justifyContent: "flex-start" }}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "10px",
                    maxWidth: "75%",
                    backgroundColor: "#fff",
                    marginLeft: 0,
                    marginRight: "auto",
                  }}
                >
                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(marked(friendMessageChunks)),
                    }}
                  />
                </Paper>
              </ListItem>
            )}
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
