import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import axios from "axios"; // Import Axios for making API requests
import { ToastContainer } from "react-toastify"; // Import ToastContainer for displaying notifications
import "react-toastify/dist/ReactToastify.css"; // Import styles for Toastify
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon for icons
import { faSync } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icon faSync for refresh icon
import { error_pop_up } from "../api/pop_up"; // Import custom error popup function

const server = "https://gruppe9.toni-barth.com"; // Define the server URL

function RoomList() {
  const [list, setList] = useState<string[]>([]); // State to store the list of room names

  // Function to update the room list by making an API request
  function update_room_list() {
    axios
      .get(`${server}/rooms`) // Send a GET request to fetch room data from the server
      .then((response) => {
        const roomNames = response.data.rooms.map((room: any) => room.name); // Extract room names from the response data
        setList(roomNames); // Update the list state with the room names
      })
      .catch((error) => {
        error_pop_up("Error uploading rooms" + error.message); // Display an error popup if there's an issue with the API request
        console.log(error); // Log the error for debugging
      });
  }

  useEffect(() => {
    update_room_list(); // Call the update_room_list function when the component mounts to initially fetch room data
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div style={{ flex: 1 }}>
      <Container className="pt-4 pb-3 ">
        <Row>
          <Col
            sm="9"
            className="justify-content-center justify-content-sm-start d-flex"
          >
            <h1>List of open rooms</h1>
          </Col>
          <Col sm="3" className="mt-2 mb-1 justify-content-end d-flex">
            <Button
              variant="info"
              onClick={update_room_list}
              className="w-100"
              style={{ backgroundColor: "#F3D748", border: "none" }}
            >
              <FontAwesomeIcon icon={faSync} /> Update
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="mb-5">
        <ListGroup>
          {list.map((item, index) => (
            <ListGroup.Item key={index}>
              {item.length > 5 ? item.slice(0, 5) + "*****" : item}
              {/* Display room names, truncating long names */}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <ToastContainer /> {/* Container for displaying toast notifications */}
    </div>
  );
}

export default RoomList;
