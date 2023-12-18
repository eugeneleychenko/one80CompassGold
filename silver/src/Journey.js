import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


const methods = [
  { name: 'Method One', description: 'Description for method one.' },
  { name: 'Method Two', description: 'Description for method two.' },
  { name: 'Method Three', description: 'Description for method three.' }
]

const Journey = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMethodClick = (method) => {
    // Placeholder for method click functionality
  };

  const handleMethodDelete = (method) => {
    // Placeholder for method delete functionality
  };

  const handleMethodAdd = () => {
    // Placeholder for method add functionality
  };

  

  return (
    open && (
      <Box sx={{ position: 'relative', width: '35%' }}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
          <CloseIcon />
        </IconButton>
        <Box sx={{ position: 'fixed', top: 0, width: 'inherit' }}>
          <List>
            {methods.map((method, index) => (
              <ListItem button key={index}>
                <ListItemText primary={method.name} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ mt: 8 }}>
          <Typography variant="h1">Journey One</Typography>
          <Typography variant="h3">Project description</Typography>
          <Typography variant="h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
          {methods.map((method, index) => (
            <React.Fragment key={index}>
              <Box sx={{ backgroundColor: 'tan', p: 2, mt: 2 }}>
                <Typography variant="h2">{method.name}</Typography>
                <Typography variant="h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                <Button variant="contained" color="warning" endIcon={<PlayArrowIcon />} sx={{ mt: 1 }}>
                  Step by Step
                </Button>
              </Box>
              <Box sx={{ backgroundColor: 'white', p: 2, mt: 2 }}>
                <Typography variant="body1">Examples</Typography>
                <Typography variant="body2">{method.examples}</Typography>
              </Box>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    )
  );
};

export default Journey;

