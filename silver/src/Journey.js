import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const style = {
  fontFamily: "'Source Sans 3', sans-serif",
};

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const methods = [
  {
    name: "Method One",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    examples: [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    helpfulHints: [loremIpsum, loremIpsum, loremIpsum],
    helpfulResources: [loremIpsum, loremIpsum, loremIpsum, loremIpsum],
    templates: [loremIpsum, loremIpsum, loremIpsum, loremIpsum],
    relatedMethods: [loremIpsum, loremIpsum],
  },
  {
    name: "Method Two",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    examples: [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    helpfulHints: [loremIpsum, loremIpsum, loremIpsum],
    helpfulResources: [loremIpsum, loremIpsum, loremIpsum, loremIpsum],
    templates: [loremIpsum, loremIpsum, loremIpsum, loremIpsum],
    relatedMethods: [loremIpsum, loremIpsum],
  },
  {
    name: "Method Three",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    examples: [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    helpfulHints: [loremIpsum, loremIpsum, loremIpsum],
    helpfulResources: [loremIpsum, loremIpsum, loremIpsum, loremIpsum],
    templates: [loremIpsum, loremIpsum, loremIpsum, loremIpsum],
    relatedMethods: [loremIpsum, loremIpsum],
  },
];

const Journey = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [methodPosition, setMethodPosition] = useState({ top: 0, left: 0 });

  const handleMethodClick = (method) => {
    setSelectedMethod(method);
  };

  const handleMethodDelete = (method) => {
    // Placeholder for method delete functionality
  };

  const handleMethodAdd = () => {
    // Placeholder for method add functionality
  };

  return (
    <Box
      className="menu"
      sx={{
        display: "flex",
        width: "93%", // Set the parent container to full width
        position: "relative", // Needed for absolute positioning context
        mt: "50px",
      }}
    >
      <Box
        sx={{
          position: "fixed", // Position this Box absolutely
          left: 0,
          top: "50px",
          width: "250px", // Set a fixed width for the sidebar
          borderRadius: "10px",
          bgcolor: "black",
          color: "white",
          m: "0 10px",
          "z-index": " 10000",
        }}
      >
        <List className="List_Number">
          <ListItem button key="overview">
            <ListItemText primary="Overview" />
          </ListItem>
          <Divider sx={{ margin: "0 20px", bgcolor: "grey" }} />
          {methods.map((method, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                style={style}
                onClick={() => handleMethodClick(method)}
              >
                <ListItemText primary={method.name} />
              </ListItem>
              <Divider sx={{ margin: "0 20px", bgcolor: "grey" }} />
            </React.Fragment>
          ))}
          <ListItem sx={{ pt: "20px" }}>
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
              }}
              endIcon={<ChatBubbleOutlineIcon />}
            >
              Return to Chat
            </Button>
          </ListItem>
        </List>
      </Box>
      <Box
        className="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
          minWidth: "300px",
          justifyContent: "flex-start",
          width: "100%",
          position: "relative", // Add relative positioning here
        }}
      >
        <IconButton
          onClick={() => setSelectedMethod(null)}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h3" sx={{ textAlign: "left", pl: "350px" }}>
          Journey One
        </Typography>

        <Typography
          variant="h5"
          sx={{ textAlign: "left", pt: "20px", pl: "350px" }}
        >
          Project Description
        </Typography>
        <Typography
          variant="h7"
          sx={{ textAlign: "left", p: "40px 0 ", pl: "350px" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        {methods.map((method, index) => (
          <React.Fragment key={index}>
            <Box
              sx={{
                backgroundColor: "tan",
                p: 2,
                mt: 2,
                textAlign: "left",
                width: "calc(100% - 250px)", // Adjust width to account for method-details
                pl: "350px",
                paddingBottom: "50px",
                className: "Method_Number",
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
              }}
            >
              <Typography variant="h5" sx={{ p: "30px 0" }}>
                {method.name}
              </Typography>

              {method.description.split("\n").map((line, index) => (
                <div
                  key={index}
                  style={{
                    paddingTop: "20px",
                    paddingRight: "350px",
                  }}
                >
                  {line}
                </div>
              ))}
              <br></br>
              <Button
                variant="contained"
                color="warning"
                endIcon={<PlayArrowIcon />}
                sx={{ mt: 1 }}
              >
                Step by Step
              </Button>
            </Box>

            <Box
              sx={{
                position: "absolute",
                right: "10px",
                top: "10px",
                width: "100px",
                height: "50px",
                bgcolor: "lightgrey",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
              }}
            >
              <Typography>Placeholder</Typography>
            </Box>

            {/* <Box
              className="method-details"
              sx={{
                position: "absolute",
                right: 0,
                top: "50px",
                width: "250px",
                bgcolor: "white",
                height: "calc(100% - 50px)",
                overflowY: "auto",
                borderRadius: "10px",
                m: "0 10px",
                display: "inline-block",
                verticalAlign: "top",
              }}
            >
              <Typography variant="h6" sx={{ p: 2 }}>
                Helpful Hints
              </Typography>
              {method.helpfulHints.map((hint, index) => (
                <Typography key={index} sx={{ mt: 2, p: 2 }}>
                  {hint}
                </Typography>
              ))}
              <Typography variant="h6" sx={{ mt: 4, p: 2 }}>
                Helpful Resources
              </Typography>
              {method.helpfulResources.map((resource, index) => (
                <Typography key={index} sx={{ mt: 2, p: 2 }}>
                  {resource}
                </Typography>
              ))}
              <Typography variant="h6" sx={{ mt: 4, p: 2 }}>
                Templates
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  mt: 2,
                  p: 2,
                }}
              >
                {method.templates.map((template, index) => (
                  <Box
                    key={index}
                    sx={{ p: 2, bgcolor: "lightgrey", borderRadius: 1 }}
                  >
                    <Typography>{template}</Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="h6" sx={{ mt: 4, p: 2 }}>
                Related / Alternative Methods
              </Typography>
              {method.relatedMethods.map((method, index) => (
                <Typography key={index} sx={{ mt: 2, p: 2 }}>
                  {method}
                </Typography>
              ))}
            </Box> */}

            <Box
              sx={{
                backgroundColor: "white",
                p: 2,
                mt: 2,
                textAlign: "left",
                className: "Examples_Number",
              }}
            >
              <Typography variant="h5" sx={{ pl: "330px" }}>
                Examples
              </Typography>
              {method.examples.map((example, index) => (
                <div
                  key={index}
                  style={{
                    paddingLeft: "330px",
                    paddingTop: "20px",
                    paddingRight: "50px",
                  }}
                >
                  <Typography variant="h7">{example}</Typography>
                </div>
              ))}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Journey;
