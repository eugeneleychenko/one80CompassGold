import React, { useState } from 'react';
import { Grid, Box, TextField, Button, InputAdornment } from '@mui/material';

export const ChatInput = () => {
    const [inputValue, setInputValue] = useState('');

    const onSendClick = (value) => {
        // Placeholder for send click functionality
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
