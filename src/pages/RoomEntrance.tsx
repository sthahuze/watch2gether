import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import background from "../components/image/jvleergjp-rbvdis.jpg";
import axios from "axios";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { success_pop_up, error_pop_up } from "../api/pop_up";

const server = "https://gruppe9.toni-barth.com";

function RoomEntrance() {
  const [roomid, setRoomID] = useState("");
  const navigate = useNavigate();

  const handleRoomIDChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomID(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userID = localStorage.getItem("userID");

    axios
      .put(`${server}/rooms/${roomid}/users`, { user: userID })
      .then((response) => {
        if (response.status === 200) {
          success_pop_up("You successfully entered the Room");
          //localStorage.setItem("roomid", roomid);
          navigate(`/room/${roomid}`);
        } else {
          error_pop_up("Error " + response.status);
        }
      })
      .catch((error) => {
        error_pop_up("Error " + error.message);
      });
  };

  return (
    <Container
      className="vh-100 justify-content-center align-items-center"
      fluid
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${background})`,
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
                  onChange={handleRoomIDChange}
                />
              </Form.Group>

              <Button type="submit">Join a Room</Button>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
        <ToastContainer />
      </div>
    </Container>
  );
}

export default RoomEntrance;
