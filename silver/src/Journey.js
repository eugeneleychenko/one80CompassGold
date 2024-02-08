import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
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
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const style = {
  fontFamily: "'Source Sans 3', sans-serif",
};

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const Journey = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [methodPosition, setMethodPosition] = useState({ top: 0, left: 0 });
  const [firstUserInput, setFirstUserInput] = useState("");
  const methodRefs = useRef([]);
  const navigate = useNavigate();
  const { initialFriendDetails, selectedMethods } = useContext(ChatContext);

  console.log("selectedMethod", selectedMethod);
  const [methodsData, setMethodsData] = useState([]);
  const location = useLocation();

  const handleClose = () => {
    navigate("/");
  };

  useEffect(() => {
    // After the component mounts, calculate the height of the placeholders
    methodRefs.current.forEach((methodBox, index) => {
      if (methodBox && methodBox.lastChild) {
        const placeholderHeight = methodBox.lastChild.offsetHeight;
        methodBox.style.marginBottom = `${placeholderHeight}px`;
      }
    });
  }, []);

  useEffect(() => {
    // Function to fetch data from the JSON URL
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://opensheet.elk.sh/1vgJJHgyIrjip-6Z-yCW6caMgrZpJo1-waucKqvfg1HI/6"
        );
        const data = await response.json();
        setMethodsData(data);
      } catch (error) {
        console.error("Error fetching methods data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("methodsData", methodsData);

  useEffect(() => {
    // Function to parse URL parameters and filter methods
    const filterMethodsFromParams = () => {
      const searchParams = new URLSearchParams(location.search);
      const methods = searchParams.getAll("method");
      const userInput = searchParams.get("firstUserInput");
      console.log("1st User Input:", userInput); //
      console.log("URL methods:", methods); // Added console log to see the methods in the URL
      setFirstUserInput(userInput);
      const filteredData = methodsData.filter((item) =>
        methods.includes(item.Uniques)
      );
      // Update the state with the filtered data
      setSelectedMethod(filteredData); // Assuming you have a state setter function like this
    };

    if (methodsData.length > 0) {
      filterMethodsFromParams();
    }
  }, [location.search, methodsData]);

  //scrolling to section
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

          {selectedMethod?.map((methodDetail, index) => {
            const uniqueMethod = methodDetail.Uniques;
            return (
              <React.Fragment key={index}>
                <ListItem
                  button
                  style={style}
                  onClick={() => {
                    handleMethodClick(index);
                  }}
                >
                  <ListItemText primary={uniqueMethod} />
                </ListItem>
                <Divider sx={{ margin: "0 20px", bgcolor: "grey" }} />
              </React.Fragment>
            );
          })}

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
        {firstUserInput && (
          <Typography
            variant="h7"
            sx={{ textAlign: "left", p: "20px 0", pl: "350px", pr: "100px" }}
          >
            {firstUserInput}
          </Typography>
        )}

        {selectedMethod?.map((methodDetail, index) => (
          <React.Fragment key={index}>
            <div className="pretty">
              <div className={`pretty-content Method_Number_${index}`}>
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
                    {methodDetail.Uniques}
                  </Typography>
                  <div style={{ paddingTop: "20px" }}>
                    {methodDetail["AI Response"]
                      ? methodDetail["AI Response"]
                          .split("\n")
                          .map((line, idx) => (
                            <React.Fragment key={idx}>
                              <Typography sx={{ pr: "350px" }}>
                                {line.includes("*") ? (
                                  <b>{line.substring(1)}</b>
                                ) : (
                                  line
                                )}
                              </Typography>
                              {line.includes("*") ? <br /> : null}
                            </React.Fragment>
                          ))
                      : null}
                  </div>
                  {/* </Typography> */}

                  <br />
                  <Button
                    variant="contained"
                    color="warning"
                    endIcon={<PlayArrowIcon />}
                    sx={{ mt: 1 }}
                    onClick={() => window.open(methodDetail["Video"], "_blank")}
                  >
                    Step by Step Video
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
                  {methodDetail["Examples"]
                    ? methodDetail["Examples"]
                        .split("\n\n")
                        .map((example, idx) => (
                          <Typography
                            key={idx}
                            sx={{
                              textAlign: "left",
                              pt: "20px",
                              pl: "330px",
                              pr: "200px",
                            }}
                          >
                            {example}
                          </Typography>
                        ))
                    : null}
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
                  {methodDetail["Helpful Hints"]
                    ? methodDetail["Helpful Hints"]
                        .split("\n")
                        .map((hint, idx) => (
                          <Typography key={idx} sx={{ mb: 1 }}>
                            {hint}
                          </Typography>
                        ))
                    : null}
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ p: 2, textAlign: "left", fontWeight: "bold" }}
                >
                  Helpful Resources
                </Typography>
                <Box sx={{ p: 2 }}>
                  {methodDetail["Helpful Resources"]
                    ? methodDetail["Helpful Resources"]
                        .split("\n")
                        .map((resource, idx) => (
                          <Typography key={idx} sx={{ mb: 1 }}>
                            {resource}
                          </Typography>
                        ))
                    : null}
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
                  {methodDetail["Template Images"] &&
                  methodDetail["Template Links"]
                    ? methodDetail["Template Images"]
                        .split("\n")
                        .map((template, idx) => {
                          const imageUrl = template
                            .replace(/^\d+\)\s/, "")
                            .trim();
                          const linkUrl = methodDetail["Template Links"]
                            .split("\n")
                            [idx].replace(/^\d+\)\s/, "")
                            .trim();
                          return (
                            <a
                              key={idx}
                              href={linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={imageUrl}
                                alt={`Template ${idx + 1}`}
                                style={{ width: "100px", height: "100px" }}
                              />
                            </a>
                          );
                        })
                    : null}
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ p: 2, textAlign: "left", fontWeight: "bold" }}
                >
                  Related / Alternative Methods
                </Typography>
                <Box sx={{ p: 2 }}>
                  {methodDetail && (
                    <>
                      {methodDetail["Alt 1"] && (
                        <Typography key={"Alt-1"} sx={{ mb: 1 }}>
                          {methodDetail["Alt 1"]}
                        </Typography>
                      )}
                      {methodDetail["Alt 2"] && (
                        <Typography key={"Alt-2"} sx={{ mb: 1 }}>
                          {methodDetail["Alt 2"]}
                        </Typography>
                      )}
                      {methodDetail["Alt 3"] && (
                        <Typography key={"Alt-3"} sx={{ mb: 1 }}>
                          {methodDetail["Alt 3"]}
                        </Typography>
                      )}
                    </>
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
