import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {ChatInput} from './ChatInput';

// Placeholder functions
const handleCreateJourneyClick = (methods) => {
  // TODO: Implement this function
};
const chatContainerRef = React.createRef();
// Placeholder messages array simulating chat data
const messages = [
  { text: "This is a message from the user.", sender: "user" },
  { text: "This is a message from a friend.", sender: "friend", details: { Methods: [] } }
]; // This should eventually be replaced with state or prop data

const ChatInterface = () => {
  return (
    <>
    <Grid container sx={{ height: '100%' }}>
      <Grid item xs={12} ref={chatContainerRef} sx={{ height: '100%', overflowY: 'auto', paddingBottom: '180px' /* Adjust this value as needed */ }}>
        <List sx={{ padding: 0 }}>
            {messages.map((message, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Paper elevation={3} sx={{ padding: '10px', maxWidth: '75%', width: '75%', backgroundColor: message.sender === 'user' ? '#e0f7fa' : '#fff', marginLeft: message.sender === 'user' ? 'auto' : 0, marginRight: message.sender === 'friend' ? 'auto' : 0 }}>
                  <Typography variant="body1">{message.text}</Typography>
                  </Paper>
              </ListItem>
              {message.sender === 'friend' && message.details && (
                <ListItem sx={{ justifyContent: 'flex-start' }}>
                  <Button variant="contained" color="secondary" onClick={() => handleCreateJourneyClick(message.details.Methods)}>
                    Create Custom Journey from Answer
                  </Button>
                </ListItem>
              )}
            </React.Fragment>
            ))}
        </List>
      </Grid>
    </Grid>
    <Grid item xs={12}>
        <ChatInput />
    </Grid>
</>
);
              }
export default ChatInterface;
