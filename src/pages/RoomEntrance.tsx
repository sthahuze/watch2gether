import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../components/image/jvleergjp-rbvdis.jpg";
import axios from "axios";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const server = "https://gruppe9.toni-barth.com";

function RoomEntrance() {
  const [roomid, setRoomID] = useState("");
  const navigate = useNavigate();

  const handleRoomIDChange = (event: any) => {
    setRoomID(event.target.value);
  };

  const handleSubmit = () => {
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userID");
    if (username === "") {
      navigate(`/login`);
    } else {
      axios
        .put(`${server}/rooms/${roomid}/users`, { user: userID })
        .then((response) => {
          if (response.status === 200) {
            toast.success("You successfully entered the Room", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
          } else {
            toast.error("Error " + response.status, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
          }
        })
        .catch((error) => {
          toast.error("Error " + error.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        });

      navigate(`/room/${roomid}`);
    }
  };

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
      <ToastContainer />
    </Container>
  );
}

export default RoomEntrance;
