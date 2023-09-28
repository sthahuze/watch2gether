import { useEffect, useState } from "react";  // Importing React hooks for managing state and side effects
import { useNavigate } from "react-router-dom";  // Importing routing functionality
import { CustomForm } from "../components/Form";  // Importing a custom form component
import Youtube from "../components/Youtube";  // Importing a custom YouTube component
import Container from "react-bootstrap/Container";  // Importing a Bootstrap container component
import { Button, Col, Row } from "react-bootstrap";  // Importing Bootstrap UI components
import Chat from "../components/Chat";  // Importing a custom chat component
import { ToastContainer } from "react-toastify";  // Importing a notification component
import "react-toastify/dist/ReactToastify.css";  // Importing styles for notifications
import ClipboardJS from "clipboard";  // Importing ClipboardJS library for clipboard functionality
import { FaShare } from "react-icons/fa";  // Importing a share icon from React Icons library
import LoadingSpinner from "../components/LoadingSpinner";  // Importing a custom loading spinner component
import {
  youtube_link,
  user_change,
  copyRoomLink,
  room_existance,
  user_in_room,
} from "../api/room_api";  // Importing various functions from API files
import { error_pop_up, info_pop_up, success_pop_up } from "../api/pop_up";  // Importing functions for displaying pop-up notifications
import { enter_room } from "../api/enter_room";  // Importing a function for entering a room

function Room() {
  const navigate = useNavigate();  // Initialize navigation function
  const [youtubeLink, setYoutubeLink] = useState<string>("");  // State for storing YouTube video link
  var currentYoutubeLink: string | null = "";
  const [roomid, setRoomId] = useState<string>("");  // State for storing the room ID
  const [isLoading, setIsLoading] = useState(true);  // State for loading indicator
  var room = "";
  var FetchState = false;
  const userid = localStorage.getItem("userID");  // Get the user ID from local storage

  interface User {
    id: number;
    name: string;
  }

  var users: User[] = [];  // Initialize an array for storing user data

  // Function to fetch room data and perform necessary checks
  const fetchData = async () => {
    setIsLoading(true);
    FetchState = true;
    // Split the URL into parts using a regular expression
    const parts = window.location.href.split("/room/");
    if (parts.length === 2) {
      room = parts[1];

      localStorage.setItem("roomid", room);  // Store the room ID in local storage
      console.log("roomid valid" + room);
    } else {
      localStorage.removeItem("roomid");
      setIsLoading(false);
      localStorage.removeItem("tmpURL");
      navigate("/error");  // Redirect to an error page
    }

    localStorage.removeItem("tmpURL");
    try {
      const roomE = await room_existance(room);  // Check if the room exists

      if (roomE === false) {
        localStorage.removeItem("roomid");
        error_pop_up("Room does not exist");  // Display an error notification
        setIsLoading(false);
        navigate("/");  // Redirect to the home page
      } else {
        // Check if the user is logged in
        if (userid === "" || userid === null) {
          // If the user is not logged in, display an error and store the URL
          error_pop_up("You have to log in first!");
          localStorage.setItem("tmpURL", `/room/${room}`);

          // Redirect the user to the login page
          setIsLoading(false);
          navigate("/login");
        } else {
          setRoomId(room);
          try {
            const user = await user_in_room(room);

            if (user === false) {
              console.log("user not in room");
              const entrance = await enter_room(room, userid);

              if (entrance === false) {
                localStorage.removeItem("roomid");
                setIsLoading(false);
                navigate("/error");
              }
            }
          } catch (error) {
            setIsLoading(false);
            console.error(error);
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }

    setIsLoading(false);
  };

  // useEffect to fetch data when the component mounts and manage clipboard functionality
  useEffect(() => {
    if (FetchState === false) {
      fetchData();
    }

    const clipboard = new ClipboardJS(".copy-button");  // Initialize ClipboardJS for copying room link

    return () => {
      clipboard.destroy();  // Cleanup ClipboardJS on component unmount
    };
  }, [FetchState]);

  // useEffect to update the room ID when the URL changes
  useEffect(() => {
    if (roomid !== "") {
      const parts = window.location.href.split("/room/");
      if (parts.length === 2) {
        const newRoomId = parts[1];
        setRoomId(newRoomId);
        localStorage.setItem("roomid", newRoomId);
      } else {
        localStorage.removeItem("roomid");
        navigate("/error");
      }
    }
  }, [navigate]);

  // useEffect to fetch YouTube link and user changes periodically
  useEffect(() => {
    const fetchDataAndHandleAsync = async () => {
      try {
        await youtube_link(setYoutubeLink, youtubeLink);
        users = await user_change(users);

        // Update currentYouTubeLink only if youtubeLink has changed
        if (youtubeLink !== currentYoutubeLink) {
          currentYoutubeLink = youtubeLink;
          info_pop_up("New Video!");  // Display an info notification for a new video
        }
      } catch (error) {
        // Handle errors if needed
      }
    };

    // Create an interval only after the component is mounted
    const intervalId = setInterval(() => {
      fetchDataAndHandleAsync();
    }, 2500);

    // Cleanup the interval on component unmount
    return () => {
      users = [];
      clearInterval(intervalId);
    };
  }, [youtubeLink]);

  const [isActive, setIsActive] = useState(false);

  // Function to handle the "Share" button click
  const handleButtonClick = () => {
    copyRoomLink(); // Copy the room link to the clipboard
    success_pop_up("Link is copied to clipboard"); // Display a success notification
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner /> // Display a loading spinner while the page is loading
      ) : (
        <Container>
          <Row className="pt-1">
            <Col lg={8}>
              <Row className="mt-2 pb-4 pb-sm-2">
                <Col
                  md="auto"
                  sm="5"
                  className="pt-md-3 pt-2 justify-content-center justify-content-sm-end d-flex"
                >
                  <h4>You are in room: </h4>
                </Col>
                <Col
                  md="auto"
                  sm="7"
                  className="pt-md-3 pt-2 justify-content-center justify-content-sm-start d-flex"
                >
                  <h4>{roomid}</h4>
                </Col>
                <Col className="col justify-content-lg-end justify-content-center d-flex pt-md-3 pt-sm-2 pt-2">
                  <Button
                    className="copy-button btn w-100"
                    style={{
                      backgroundColor: isActive ? "#FFEA99" : "#F3D748",
                      transition: "background-color 0.1s ease",
                      color: "black",
                      border: "none",
                      maxWidth: "300px",
                    }}
                    onMouseDown={() => setIsActive(true)}
                    onMouseUp={() => setIsActive(false)}
                    onClick={handleButtonClick}
                  >
                    <FaShare /> Share
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="Video">
                    <CustomForm setYoutubeLink={setYoutubeLink} />
                    {youtubeLink === "Loading..." ? ( // Check if the video URL is ready
                      <p>Loading video...</p> // Display a loading message while the video is loading
                    ) : (
                      <Youtube youtubeLink={youtubeLink ?? ""} />
                    )}
                  </div>
                </Col>
              </Row>
              <ToastContainer />
            </Col>
            <Col className="pt-1">
              <Chat />
            </Col>
          </Row>
        </Container>
      )}
      <ToastContainer />
    </div>
  );
}

export default Room;
