import background from "./image/jvleergjp-rbvdis.jpg"; // Importing a background image.
import { Col, Button, Container, Row } from "react-bootstrap"; // Importing Bootstrap components for layout and buttons.
import { useNavigate } from "react-router-dom"; // Importing a hook for programmatic navigation.
import axios from "axios"; // Importing Axios for making HTTP requests.
import { ToastContainer } from "react-toastify"; // Importing a toast notification container.
import "react-toastify/dist/ReactToastify.css"; // Importing styles for toast notifications.
import { success_pop_up, error_pop_up } from "../api/pop_up"; // Importing custom pop-up functions.

const server = "https://gruppe9.toni-barth.com"; // Define the server URL.

function MainBlock() {
  const navigate = useNavigate(); // Initialize the navigation function.
  
  // Function to handle room creation.
  const handleCreateRoom = () => {
    const username = localStorage.getItem("username"); // Get the username from local storage.
    const userID = localStorage.getItem("userID"); // Get the user ID from local storage.

    if (username === "" || username === null) {
      // If the user is not logged in, show an error pop-up and navigate to the login page.
      error_pop_up("You have to log in first!");
      navigate(`/login`);
    } else {
      // If the user is logged in, send a POST request to create a room.
      axios
        .post(`${server}/rooms/`)
        .then((response) => {
          if (response.status === 201) {
            const roomid = response.data.name; // Get the room ID from the response.
            localStorage.setItem("roomid", roomid); // Store the room ID in local storage.

            // Send a PUT request to add the user to the room.
            axios
              .put(`${server}/rooms/${roomid}/users`, { user: userID })
              .then((response) => {
                if (response.status === 200) {
                  // If the user was successfully added to the room, show a success pop-up and navigate to the room.
                  success_pop_up("You successfully entered the Room");
                  navigate(`/room/${roomid}`);
                } else {
                  // If there was an error adding the user to the room, show an error pop-up.
                  error_pop_up("Error " + response.status);
                }
              })
              .catch((error) => {
                // If there was an error with the PUT request, show an error pop-up.
                error_pop_up("Error " + error.message);
              });
          } else {
            // If there was an error with the POST request to create a room, show an error pop-up.
            error_pop_up("Error " + response.status);
          }
        })
        .catch((error) => {
          // If there was an error with the POST request, show an error pop-up.
          error_pop_up("Error " + error.message);
        });
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
      <Row className="justify-content-md-center">
        <Col>
          <div className="pb-4 text-center">
            <h1>Whatch2Gether</h1>
            <h5>spend time with your friends and loved ones from a distance</h5>
          </div>
          <div className="pt-3 pb-5 mb-5 d-grid gap-6 col-8 mx-auto">
            <Button
              onClick={handleCreateRoom}
              className="btn btn-danger btn-lg"
            >
              Create room
            </Button>
          </div>
        </Col>
      </Row>
      <ToastContainer /> {/* Render the toast notification container for pop-ups. */}
    </Container>
  );
}

export default MainBlock;
