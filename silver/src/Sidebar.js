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
import { Box, Link } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
// import ChatContext from "./ChatContext";

const Sidebar = () => {
  const navigate = useNavigate();

  const {
    createJourneyClickCount,
    setCreateJourneyClickCount,
    initialFriendDetails,
    selectedMethods,
    setSelectedMethods,
    handleDeleteMethod,
    firstUserInput,
  } = useContext(ChatContext);

  console.log(createJourneyClickCount);
  console.log("selectedMethods", selectedMethods);

  return (
    <Grid container style={{ height: "100vh", width: "35%", overflow: "auto" }}>
      <Grid
        item
        style={{
          width: "100%",
          backgroundColor: "black",
          color: "white",
          padding: "10px",
        }}
      >
        <h3 style={{ width: "90%", marginLeft: "15px", pb: "10px" }}>
          YOUR JOURNEY
        </h3>
        {createJourneyClickCount === 0 && (
          <Typography
            variant="subtitle1"
            style={{
              width: "90%",
              margin: "0 auto",
              display: "block",
              textAlign: "left",
              fontWeight: "900",
            }}
          >
            Start chatting to add methods to your journey
          </Typography>
        )}
        <br />
        {createJourneyClickCount > 0 && (
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              margin: "10px 0",
              width: "100%",
              borderRadius: "10px",
            }}
            onClick={() => {
              const params = new URLSearchParams();
              selectedMethods.forEach((method) => {
                params.append("method", method);
              });
              if (firstUserInput) {
                params.append("firstUserInput", firstUserInput);
              }
              window.open(`/journey?${params.toString()}`, "_blank");
            }}
          >
            <b>Go to your journey hub</b>
          </Button>
        )}

        {selectedMethods.map((method, index) => (
          <React.Fragment key={index}>
            <Box
              style={{
                border: "1px solid white",
                marginTop: "5px",
                borderRadius: "5px",
              }}
            >
              <Accordion style={{ backgroundColor: "black", color: "white" }}>
                <AccordionSummary
                  expandIcon={
                    <>
                      <DeleteIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMethod(method);
                        }}
                        style={{ color: "white", transform: "none !important" }}
                        className="keep-icon-upright"
                      />
                    </>
                  }
                >
                  <b>{method}</b>
                </AccordionSummary>
                <Divider style={{ backgroundColor: "grey" }} />
                <AccordionDetails>
                  <Typography variant="body2">
                    {initialFriendDetails.Alternatives.find(
                      (alt) => alt[method]
                    )?.[method]["Description (short)"] ||
                      "No description available."}
                  </Typography>
                  <br />
                  <Link
                    href={`/journey?method=${encodeURIComponent(method)}`}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Learn more in Your Journey Hub →
                  </Link>
                </AccordionDetails>
              </Accordion>
            </Box>
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  );
};

export default Sidebar;
