import React, { useState, useContext } from 'react';
import { Grid, Box, TextField, Button, InputAdornment } from '@mui/material';
import ChatContext from './ChatContext';



export const ChatInput = () => {
    const [inputValue, setInputValue] = useState('');
    const { sendMessage } = useContext(ChatContext);

    const onSendClick = async () => {
        if (!inputValue.trim()) return; // Prevent sending empty messages
       
        sendMessage({ text: inputValue, sender: 'user' });

        setInputValue('');
    };

    return (
        <Grid item xs={3} sx={{ height: '100%', padding: '10px 0' }}>
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px' }}>
                <TextField
                    style={{ backgroundColor: 'white' }}
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && onSendClick(inputValue)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button variant="contained" color="primary" onClick={() => onSendClick(inputValue)}>
                                    Send
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Grid>
    );
};
