import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import background from "../components/image/jvleergjp-rbvdis.jpg";
import { Container, Button, Modal, Form } from "react-bootstrap";

function RoomEntrance() {
  const [roomid, setRoomID] = useState("");
  const navigate = useNavigate();

  const handleRoomIDChange = (event: any) => {
    setRoomID(event.target.value);
  };

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      //server connection needed
      //socket.emit("room_existance_check", roomid);
    },
    [roomid]
  );

  const handleRoomExistanceCheck = useCallback(
    (exists: any) => {
      if (exists === 1) {
        //server connection needed
        //socket.emit("join_room", roomid);
        localStorage.setItem("roomid", roomid);
        navigate(`/room/${roomid}`);
      } else {
        alert("Room does not exist");
      }
    },
    [roomid, navigate]
  );

  useEffect(() => {
    //server connection needed
    //socket.on("room_existance_check", handleRoomExistanceCheck);

    return () => {
      //server connection needed
      //socket.off("room_existance_check", handleRoomExistanceCheck);
    };
  }, [handleRoomExistanceCheck]);

  return (
    <Container
      className="vh-100 d-flex justify-content-center align-items-center"
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
      </div>
    </Container>
  );
}

export default RoomEntrance;
