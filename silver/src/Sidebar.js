import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "./ChatContext";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import DeleteIcon from "@mui/icons-material/Delete";
// import ChatContext from "./ChatContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const topics = [];
  const methods = [];
  const handleNewTopic = () => {};
  const handleRenameTopic = (index) => {};
  const handleShuffleClick = (method) => {};
  const handleDeleteMethod = (method) => {};
  const shuffleCount = {};
  const currentAlts = {};
  const {
    createJourneyClickCount,
    setCreateJourneyClickCount,
    initialFriendDetails,
  } = useContext(ChatContext);

  console.log(createJourneyClickCount);

  return (
    <Grid container style={{ height: "100vh", width: "35%" }}>
      <Grid
        item
        style={{
          width: "100%",
          backgroundColor: "black",
          color: "white",
          padding: "10px",
        }}
      >
        <h3>CUSTOM JOURNEY</h3>
        <Button
          style={{ width: "90%", margin: "0 auto", display: "block" }}
          variant={topics.length === 0 ? "contained" : "outlined"}
          color="primary"
          onClick={handleNewTopic}
        >
          New Topic
        </Button>
        <br />

        {topics.map((topic, index) => (
          <div key={index}>
            <Button
              variant="contained"
              style={{ marginTop: "10px", width: "90%" }}
              onClick={() => handleRenameTopic(index)}
            >
              {topic}
            </Button>
          </div>
        ))}

        {initialFriendDetails &&
          initialFriendDetails.Methods &&
          createJourneyClickCount > 0 && (
            <>
              <Button
                style={{
                  width: "90%",
                  margin: "0 auto",
                  display: "block",
                }}
                variant="outlined"
                color="primary"
                // onClick={() => setJourneyOpen(!journeyOpen)}
              >
                Journey One
              </Button>

              <Button
                variant="contained"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "30px",
                  "&:hover": {
                    bgcolor: "black",
                    color: "white",
                  },
                  width: "calc(100% - 20px)",
                  margin: "0 10px",
                  pt: "10px",
                  mb: "10px",
                  mt: "20px",
                }}
                onClick={() => navigate("/journey")}
              >
                Go To Journey Hub
              </Button>
              {initialFriendDetails.Methods.map((method, index) => (
                <React.Fragment key={index}>
                  <Divider
                    style={{ backgroundColor: "grey", marginTop: "10px" }}
                  />
                  <Accordion>
                    <AccordionSummary
                      expandIcon={
                        <>
                          <ShuffleIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShuffleClick(method);
                            }}
                          />
                          <DeleteIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteMethod(method);
                            }}
                          />
                        </>
                      }
                    >
                      {method}
                    </AccordionSummary>
                    <AccordionDetails>
                      {
                        initialFriendDetails.Alternatives[index][method][
                          "Sidebar Description"
                        ]
                      }
                    </AccordionDetails>
                  </Accordion>
                </React.Fragment>
              ))}
            </>
          )}
      </Grid>
    </Grid>
  );
};

export default Sidebar;
