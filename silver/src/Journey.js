import React, { useState, useEffect, useRef, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import ChatContext from "./ChatContext";

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
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt  in culpa qui officia deserunt mollit anim id est laborum. ",
    ],
    helpfulHints: [loremIpsum],
    helpfulResources: [loremIpsum],
    templates: [
      "https://covers.openlibrary.org/b/id/10237130-M.jpg",
      "https://covers.openlibrary.org/b/id/14444481-M.jpg",
      "https://covers.openlibrary.org/b/id/12694326-M.jpg",
    ],
    relatedMethods: [loremIpsum],
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
    templates: [
      "https://covers.openlibrary.org/b/id/10237130-M.jpg",
      "https://covers.openlibrary.org/b/id/14444481-M.jpg",
      "https://covers.openlibrary.org/b/id/12694326-M.jpg",
    ],
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
    templates: [
      "https://covers.openlibrary.org/b/id/10237130-M.jpg",
      "https://covers.openlibrary.org/b/id/14444481-M.jpg",
      "https://covers.openlibrary.org/b/id/12694326-M.jpg",
    ],
    relatedMethods: [loremIpsum, loremIpsum],
  },
];

const Journey = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [methodPosition, setMethodPosition] = useState({ top: 0, left: 0 });
  const methodRefs = useRef([]);
  const navigate = useNavigate();
  const { initialFriendDetails } = useContext(ChatContext);
  // console.log("methods: ", methods);
  console.log("initialFriendDetails: ", initialFriendDetails);

  useEffect(() => {
    // After the component mounts, calculate the height of the placeholders
    methodRefs.current.forEach((methodBox, index) => {
      if (methodBox && methodBox.lastChild) {
        const placeholderHeight = methodBox.lastChild.offsetHeight;
        methodBox.style.marginBottom = `${placeholderHeight}px`;
      }
    });
  }, []);

  const handleClose = () => {
    navigate("/"); // This will navigate back to the root path
  };

  const handleMethodClick = (index) => {
    // Construct the unique class name for the method
    const methodName = `Method_Number_${index}`;
    // Find the element by its class name
    const methodElement = document.querySelector(`.${methodName}`);
    // Scroll to the method element if it exists
    if (methodElement) {
      methodElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
        width: "100%", // Set the parent container to full width
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
            <ListItemText
              primary="Overview"
              primaryTypographyProps={{ fontWeight: "bold" }}
            />
          </ListItem>
          <Divider sx={{ margin: "0 20px", bgcolor: "grey" }} />
          {console.log(
            "initialFriendDetails.Methods:",
            initialFriendDetails.Methods
          )}
          {initialFriendDetails.Methods?.map((method, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                style={style}
                onClick={() => {
                  handleMethodClick(index);
                }}
              >
                <ListItemText primary={method} />
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
              onClick={handleClose}
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
          onClick={handleClose}
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
          sx={{ textAlign: "left", p: "40px 0 ", pl: "350px", pr: "100px" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>

        {console.log(
          "initialFriendDetails.Methods:",
          initialFriendDetails.Methods
        )}
        {initialFriendDetails.Methods?.map((method, index) => (
          <React.Fragment key={index}>
            <div className="pretty">
              <div className={`pretty-content Method_Number_${index}`}>
                <Box
                  // ref={(el) => (methodRefs.current[index] = el)} // Assign ref to the method box
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
                    {method}
                  </Typography>
                  <div style={{ paddingTop: "20px" }}>
                    <Typography sx={{ pr: "350px" }}>
                      {initialFriendDetails.Alternatives[index][method][
                        "AI Response"
                      ]
                        .split("*")
                        .map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                    </Typography>
                  </div>
                  <br />
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
                  {initialFriendDetails.Alternatives[index][method]["Examples"]
                    .split("\n\n")
                    .map((paragraph, idx) => (
                      <Typography
                        key={idx}
                        sx={{
                          textAlign: "left",
                          pt: "20px",
                          pl: "330px",
                          pr: "200px",
                        }}
                      >
                        {paragraph}
                      </Typography>
                    ))}
                </Box>
              </div>

              <Box
                className="method-details"
                sx={{
                  position: "sticky",
                  right: "40px",
                  // top: "150px",
                  width: "250px",
                  bgcolor: "black",
                  color: "white",
                  borderRadius: "10px",
                  m: "0 10px",

                  verticalAlign: "top",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ p: 2, textAlign: "left", fontWeight: "bold" }}
                >
                  Helpful Hints
                </Typography>
                <Box sx={{ p: 2 }}>
                  {initialFriendDetails.Alternatives[index][method][
                    "Helpful Hints"
                  ]
                    .split("\n")
                    .map((hint, idx) => (
                      <Typography key={idx} sx={{ mb: 1 }}>
                        {hint}
                      </Typography>
                    ))}
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ p: 2, textAlign: "left", fontWeight: "bold" }}
                >
                  Helpful Resources
                </Typography>
                <Box sx={{ p: 2 }}>
                  {initialFriendDetails.Alternatives[index][method][
                    "Helpful Resources"
                  ]
                    .split("\n")
                    .map((resource, idx) => (
                      <Typography key={idx} sx={{ mb: 1 }}>
                        {resource}
                      </Typography>
                    ))}
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ p: 2, textAlign: "left", fontWeight: "bold" }}
                >
                  Templates
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    gap: 2,
                    p: 2,
                  }}
                >
                  {initialFriendDetails.Alternatives[index][method]["Templates"]
                    .split("\n")
                    .map((template, idx) => (
                      <img
                        key={idx}
                        src={template.trim().split(") ")[1]}
                        alt={`Template ${idx + 1}`}
                        style={{ width: "100px", height: "150px" }}
                      />
                    ))}
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ p: 2, textAlign: "left", fontWeight: "bold" }}
                >
                  Related / Alternative Methods
                </Typography>
                <Box sx={{ p: 2 }}>
                  {["Alt 1", "Alt 2", "Alt 3"].map((alt) =>
                    initialFriendDetails.Alternatives[index][method][alt]
                      ? initialFriendDetails.Alternatives[index][method][alt]
                          .split("\n")
                          .map((resource, idx) => (
                            <Typography key={`${alt}-${idx}`} sx={{ mb: 1 }}>
                              {resource}
                            </Typography>
                          ))
                      : null
                  )}
                </Box>
              </Box>
            </div>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Journey;
