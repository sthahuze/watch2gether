import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import background from "../components/image/jvleergjp-rbvdis.jpg";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { enter_room } from "../api/enter_room";
import { user_in_room } from "../api/room_api";

function RoomEntrance() {
  const [roomid, setRoomID] = useState(""); // State to store the room ID
  const navigate = useNavigate();

  // Function to handle changes in the room ID input field
  const handleRoomIDChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomID(event.target.value);
  };

  // Function to handle the form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userID = localStorage.getItem("userID"); // Get the user's ID from local storage

    try {
      const isUserInRoom = await user_in_room(roomid); // Check if the user is already in the room

      if (isUserInRoom) {
        navigate(`/room/${roomid}`); // If the user is in the room, navigate to the room
      } else {
        const enteredRoom = await enter_room(roomid, userID); // Try to enter the room

        if (enteredRoom) {
          navigate(`/room/${roomid}`); // If successful, navigate to the room
        } else {
          navigate("/"); // If not successful, navigate back to the home page
        }
      }
    } catch (error) {
      console.error(error);
      navigate("/"); // Handle any errors and navigate back to the home page
    }
  };

  return (
    <Container
      className="vh-100 justify-content-center align-items-center"
      fluid
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${background})`, // Styling for the background image
      }}
    >
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog className="mt-5 pt-5">
          <Modal.Header>
            <Modal.Title>Enter the room</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formRoomId">
                <Form.Label>Enter Room ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="RoomID"
                  onChange={handleRoomIDChange} // Input field for entering the room ID
                />
              </Form.Group>

              <Button type="submit">Join a Room</Button> {/* Button to join the room */}
            </Form>
          </Modal.Body>
        </Modal.Dialog>
        <ToastContainer /> {/* Container for displaying toast notifications */}
      </div>
    </Container>
  );
}

export default RoomEntrance;
