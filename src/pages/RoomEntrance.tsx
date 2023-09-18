import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import background from "../components/image/jvleergjp-rbvdis.jpg";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { enter_room } from "../api/enter_room";
import { user_in_room } from "../api/room_api";

function RoomEntrance() {
  const [roomid, setRoomID] = useState("");
  const navigate = useNavigate();

  const handleRoomIDChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomID(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userID = localStorage.getItem("userID");

    try {
      const isUserInRoom = await user_in_room(roomid);

      if (isUserInRoom) {
        navigate(`/room/${roomid}`);
      } else {
        const enteredRoom = await enter_room(roomid, userID);

        if (enteredRoom) {
          navigate(`/room/${roomid}`);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      navigate("/");
    }
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
