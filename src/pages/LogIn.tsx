import { useState, ChangeEvent, FormEvent } from "react";
import background from "../components/image/jvleergjp-rbvdis.jpg";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const server = "https://gruppe9.toni-barth.com";

function success_pop_up(message: any) {
  toast.success(message, {
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

function error_pop_up(message: any) {
  toast.error(message, {
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

function LogInForm() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  //Function that performs log in
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle success
    axios
      .post(`${server}/users`, { name: username })
      .then((response) => {
        // Save name in Browser
        localStorage.setItem("username", username);
        // Save userID in Browser
        localStorage.setItem("userID", response.data.id);
        setUsername("");
        //go back
        success_pop_up("You successfully logged in");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          // Error from server
          error_pop_up("Error " + error.response.status);
        } else {
          // Another error
          error_pop_up(error.message);
        }
      });
  };

  //Change username in field
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
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
            <Modal.Title>Log In Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
        <ToastContainer />
      </div>
    </Container>
  );
}

export default LogInForm;
