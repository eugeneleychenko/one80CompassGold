import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import DeleteIcon from '@mui/icons-material/Delete';

const Sidebar = () => {
    // Fake placeholders
    const topics = [];
    const methods = [];
    const handleNewTopic = () => {};
    const handleRenameTopic = (index) => {};
    const handleShuffleClick = (method) => {};
    const handleDeleteMethod = (method) => {};
    const shuffleCount = {};
    const currentAlts = {};

    return(
    <Grid container style={{ height: '100vh', width: '45%' }}>
    <Grid item style={{ width: '100%', backgroundColor: 'black', color: 'white', padding: '10px' }}>
      <h3>CUSTOM JOURNEY</h3>
      <Button style={{width: '90%'}} variant={topics.length === 0 ? "contained" : "outlined"} color="primary" onClick={handleNewTopic}>
        New Topic
      </Button>
      {topics.map((topic, index) => (
        <div key={index}>
          <Button
            variant="contained"
            style={{ marginTop: '10px', width: '90%' }}
            onClick={() => handleRenameTopic(index)}
          >
            {topic}
          </Button>
        </div>
      ))}
     {methods && methods.map((method, index) => (
      <React.Fragment key={index}>
        <Divider style={{ backgroundColor: 'grey', marginTop: '10px' }} />
        <Accordion>
        <AccordionSummary
          expandIcon={
            <>
              <ShuffleIcon onClick={(e) => {
                e.stopPropagation();
                handleShuffleClick(method);
              }} />
              <DeleteIcon onClick={(e) => {
                e.stopPropagation();
                handleDeleteMethod(method);
              }} />
            </>
          }
        >
          <Typography>
            {shuffleCount[method] === 0
              ? method
              : currentAlts[method] && currentAlts[method][shuffleCount[method] - 1]}
          </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              This is a placeholder text paragraph designed to simulate conversation content. It will be replaced with actual chat history in the future.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    ))}
  </Grid>
 
</Grid>
);
}

export default Sidebar;
