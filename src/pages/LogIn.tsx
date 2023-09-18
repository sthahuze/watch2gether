import { useState, ChangeEvent, FormEvent } from "react";
import background from "../components/image/jvleergjp-rbvdis.jpg";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { success_pop_up, error_pop_up } from "../api/pop_up";

const server = "https://gruppe9.toni-barth.com";

function LogInForm() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const tmpURL = localStorage.getItem("tmpURL");

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
        console.log(tmpURL);
        if (tmpURL !== "" && tmpURL !== null) {
          localStorage.removeItem("tmpURL");
          navigate(tmpURL);
        } else {
          navigate("/");
        }
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
