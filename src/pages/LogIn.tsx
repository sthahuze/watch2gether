import { useState, ChangeEvent, FormEvent } from "react";
import background from "../components/image/jvleergjp-rbvdis.jpg"; // Importing a background image.
import { Container, Button, Modal, Form } from "react-bootstrap"; // Importing components from React Bootstrap.
import { useNavigate } from "react-router-dom"; // Importing a hook for navigating to different pages.
import axios from "axios"; // Importing Axios for making HTTP requests.
import { ToastContainer } from "react-toastify"; // Importing a toast notification container.
import "react-toastify/dist/ReactToastify.css"; // Importing styles for the toast notifications.
import { success_pop_up, error_pop_up } from "../api/pop_up"; // Importing custom pop-up notifications.

const server = "https://gruppe9.toni-barth.com"; // Define the server URL.

function LogInForm() {
  // State variables for managing form input and navigation.
  const [username, setUsername] = useState(""); // State variable to store the username input.
  const navigate = useNavigate(); // Hook for navigating between pages.
  const tmpURL = localStorage.getItem("tmpURL"); // Retrieve a temporary URL from local storage.

  // Function that performs the login when the form is submitted.
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior.

    // Send a POST request to the server to create a new user.
    axios
      .post(`${server}/users`, { name: username })
      .then((response) => {
        // Save the username in the browser's local storage.
        localStorage.setItem("username", username);

        // Save the userID in the browser's local storage.
        localStorage.setItem("userID", response.data.id);

        // Reset the username input field.
        setUsername("");

        // Show a success pop-up notification.
        success_pop_up("You successfully logged in");

        // Check if there is a temporary URL in local storage.
        if (tmpURL !== "" && tmpURL !== null) {
          // If a temporary URL exists, remove it from local storage and navigate to that URL.
          localStorage.removeItem("tmpURL");
          navigate(tmpURL);
        } else {
          // If no temporary URL exists, navigate to the default home page.
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          // Handle errors from the server and show an error pop-up with the status code.
          error_pop_up("Error " + error.response.status);
        } else {
          // Handle other errors and show an error pop-up with the error message.
          error_pop_up(error.message);
        }
      });
  };

  // Function to handle changes in the username input field.
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value); // Update the username state with the new input value.
  };

  return (
    <Container
      className="vh-100 justify-content-center align-items-center"
      fluid
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${background})`, // Apply the background image to the container.
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
                  required
                  value={username}
                  onChange={handleUsernameChange} // Bind the input value to the state variable.
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
        <ToastContainer />{" "}
        {/* Display toast notifications within this container. */}
      </div>
    </Container>
  );
}

export default LogInForm;
