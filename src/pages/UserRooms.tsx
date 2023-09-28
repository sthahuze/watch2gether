import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from React Router
import { ToastContainer } from "react-toastify"; // Import ToastContainer for displaying notifications
import "react-toastify/dist/ReactToastify.css"; // Import styles for Toastify
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon for icons
import { faSync } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icon faSync for refresh icon
import { get_user_rooms } from "../api/get_user_rooms"; // Import a custom function to get user rooms
import LoadingSpinner from "../components/LoadingSpinner"; // Import a loading spinner component

function UserRooms() {
  var isLoading = true; // Initialize a loading state
  const navigate = useNavigate(); // Create a navigation function using useNavigate
  const userid = localStorage.getItem("userID"); // Get the user's ID from local storage
  const [list, setList] = useState<string[] | undefined>([]); // State to store the list of user's rooms

  // Function to update the list of user's rooms
  async function update_room_list() {
    const user_rooms = await get_user_rooms(userid); // Fetch the user's rooms using the custom function
    setList(user_rooms); // Update the list state with the user's rooms
    isLoading = false; // Set loading state to false when data is loaded
  }

  useEffect(() => {
    update_room_list(); // Call the update_room_list function when the component mounts to initially fetch user's rooms
  }, []); // The empty dependency array ensures this effect runs only once on mount

  // Function to handle item click, e.g., navigate to the selected room
  const handleItemClick = (roomid: string) => {
    navigate(`/room/${roomid}`); // Navigate to the selected room using the React Router's navigate function
    console.log("Item clicked:", roomid); // Log the clicked room ID for reference
  };

  return (
    <div style={{ flex: 1 }}>
      <Container className="pt-4 pb-3 ">
        <Row>
          <Col
            sm="9"
            className="justify-content-center justify-content-sm-start d-flex"
          >
            <h1>List of open rooms of user</h1>
          </Col>
          <Col sm="3" className="mt-2 mb-1 justify-content-end d-flex">
            <Button
              variant="warning"
              onClick={update_room_list}
              className="w-100"
            >
              <FontAwesomeIcon icon={faSync} /> Update
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="mb-5">
        <ListGroup>
          {list?.map((item, index) => (
            <ListGroup.Item key={index}>
              <Button variant="link" onClick={() => handleItemClick(item)}>
                {item}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <ToastContainer /> {/* Container for displaying toast notifications */}
    </div>
  );
}

export default UserRooms;
