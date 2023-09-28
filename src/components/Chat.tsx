import React, { useState, useEffect, useRef } from "react"; // Importing necessary React hooks and components.
import { Col, Container, Row } from "react-bootstrap"; // Importing Bootstrap components.
import axios from "axios"; // Importing Axios for making HTTP requests.
import styled from "styled-components"; // Importing styled-components for styling.

import { info_pop_up } from "../api/pop_up"; // Importing a function for displaying info pop-ups.

const server = "https://gruppe9.toni-barth.com"; // Defining the base server URL.

// Styled component for styling chat message containers.
const ChatMessageContainer = styled.div`
  border: none;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 5px;
  margin: 2px;
  word-wrap: break-word;

  h6 {
    margin: 1px 0;
    font-size: 14px;
    color: #f85e00; /* Changing text color to gray */
  }

  p {
    margin: 1px 0;
  }
`;

// Interface definition for user objects.
interface User {
  id: number;
  name: string;
}

var users: User[] = []; // Array to store user objects fetched from the server.

function Chat() {
  // State variables using useState hook.
  const isScreen = window.matchMedia("(min-width: 992px)").matches;
  const height = isScreen ? "70vh" : "52vh";

  const [messageText, setMessageText] = useState(""); // State to store message text.
  const [chatMessages, setChatMessages] = useState([]); // State to store chat messages.
  const roomid = localStorage.getItem("roomid");
  const userid = localStorage.getItem("userID");
  const [initialRequestCompleted, setInitialRequestCompleted] = useState(false); // State to track if the initial request is completed.
  const [previousMessageCount, setPreviousMessageCount] = useState([]); // State to store the count of previous messages.

  // Function to get the username by user ID.
  function getUsernameByUserId(userId: number) {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  }

  // Function to handle sending a chat message.
  const handleSendMessage = () => {
    if (messageText?.trim() === "") {
      return; // Do not send empty messages.
    }
    axios
      .put(`${server}/rooms/${roomid}/chat`, {
        user: userid,
        message: messageText,
      })
      .then((response) => {
        console.log("Request sent successfully");
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });

    setMessageText(""); // Clear the message input.
  };

  // useEffect hook for fetching chat messages and user data.
  useEffect(() => {
    if (!initialRequestCompleted) {
      // Perform the initial request only if it hasn't been done yet.
      axios
        .get(`${server}/rooms/${roomid}/chat`)
        .then((response) => {
          const messages = response.data.messages;
          setChatMessages(messages);

          // Set the initial value for previousMessageCount.
          setPreviousMessageCount(messages.length);

          // Set the flag to indicate that the initial request is completed.
          setInitialRequestCompleted(true);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }

    const intervalId = setInterval(() => {
      // Periodically send a GET request to fetch new chat messages.
      axios
        .get(`${server}/rooms/${roomid}/chat`)
        .then((response) => {
          const messages = response.data.messages;
          setChatMessages(messages);

          const filteredMessages = messages.filter(
            (message: { userId: string }) => {
              return message.userId != userid;
            }
          );

          // Check if there are new incoming messages.
          if (filteredMessages.length > previousMessageCount) {
            info_pop_up("New message in chat!"); // Show a pop-up only if there are new incoming messages.
          }

          // Update the state with the count of previous messages.
          setPreviousMessageCount(filteredMessages.length);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });

      // Fetch the user data.
      axios
        .get(`${server}/rooms/${roomid}/users`)
        .then((response) => {
          users = response.data.users;
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);

    return () => {
      clearInterval(intervalId); // Cleanup by clearing the interval when the component unmounts.
    };
  }, [roomid, initialRequestCompleted, previousMessageCount]);

  const [isActive, setIsActive] = useState(false); // State to track button click.

  return (
    <Container
      className="pt-4 mb-4 pb-4"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <h3 className="text-center">Chat</h3>

      {/* Display chat messages */}
      <div
        className="messages pb-2 pt-3 mt-4"
        style={{
          height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflowY: "auto",
        }}
      >
        {chatMessages.map((message: any) => (
          <div key={message.id}>
            <ChatMessageContainer>
              <h6>{getUsernameByUserId(message.userId)}</h6>
              <p>{message.text}</p>
            </ChatMessageContainer>
          </div>
        ))}
      </div>

      <Row>
        <Col md={9}>
          <input
            type="text"
            className="form-control"
            placeholder="Type here..."
            value={messageText}
            onChange={(e: any) => setMessageText(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <button
            className="btn w-100"
            style={{
              backgroundColor: isActive ? "#FFEA99" : "#F3D748",
              transition: "background-color 0.1s ease",
              border: "none",
            }}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onClick={handleSendMessage}
          >
            Send
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
