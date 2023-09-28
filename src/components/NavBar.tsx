import { Link, useNavigate } from "react-router-dom"; // Importing routing components from React Router.
import { useState } from "react"; // Importing state management hook from React.
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap"; // Importing Bootstrap components for navigation and dropdowns.
import axios from "axios"; // Importing Axios for making HTTP requests.
import { ToastContainer, toast } from "react-toastify"; // Importing toast notifications.
import "react-toastify/dist/ReactToastify.css"; // Importing styles for toast notifications.
import { success_pop_up, error_pop_up } from "../api/pop_up"; // Importing custom pop-up functions.

const server = "https://gruppe9.toni-barth.com"; // Define the server URL.

function useAuth() {
  // Custom hook to check user authentication status and get the username.
  const username = localStorage.getItem("username");
  const isAuthenticated = !!localStorage.getItem("username");
  return { isAuthenticated, username };
}

function Navigation() {
  const navigate = useNavigate(); // Initialize the navigation function.
  const { isAuthenticated, username } = useAuth(); // Get authentication status and username from the custom hook.

  // Function to handle user logout.
  const handleLogout = async (e: any) => {
    e.preventDefault();
    // Delete the username and user ID from local storage.
    localStorage.removeItem("username");
    const userIdToDelete = localStorage.getItem("userID");
    localStorage.removeItem("userID");
    localStorage.removeItem("roomid");

    try {
      // Send a DELETE request to log out the user.
      const response = await axios.delete(`${server}/users/${userIdToDelete}`);
      if (response.status === 200) {
        // Show a success pop-up on successful logout.
        success_pop_up("User was successfully logged out");
      } else {
        console.error("Error when deleting user", response.status);
        // Show an error pop-up for server errors.
        error_pop_up("Error when deleting user::" + response.status);
      }
    } catch (error) {
      // Show an error pop-up for other errors.
      error_pop_up("Error when deleting user");
    }
    navigate("/");
  };

  // Function to handle room creation.
  const handleCreateRoom = async (e: any) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userID");

    try {
      // Send a POST request to create a room.
      const response = await axios.post(`${server}/rooms/`);
      if (response.status === 201) {
        const roomid = response.data.name;

        if (userID === "" || userID === null) {
          // If the user is not logged in, store the room URL and show an error pop-up.
          localStorage.setItem("tmpURL", `/room/${roomid}`);
          error_pop_up("You have to log in first!");
          navigate("/login");
        } else {
          try {
            // Send a PUT request to add the user to the room.
            const userResponse = await axios.put(
              `${server}/rooms/${roomid}/users`,
              { user: userID }
            );
            if (userResponse.status === 200) {
              // Show a success pop-up for successful room creation and entry.
              success_pop_up("You successfully created and entered the Room");
              navigate(`/room/${roomid}`);
            } else {
              // Show an error pop-up for other errors.
              error_pop_up("Error " + userResponse.status);
            }
          } catch (error) {
            // Show an error pop-up for other errors.
            error_pop_up("Error ");
          }
        }
      } else {
        // Show an error pop-up for server errors.
        error_pop_up("Error " + response.status);
      }
    } catch (error) {
      // Show an error pop-up for other errors.
      error_pop_up("Error ");
    }
  };

  // Function to handle entering a room.
  const handleEnterTheRoom = () => {
    const username = localStorage.getItem("username");
    if (username === "" || username === null) {
      // If the user is not logged in, store the room URL and show an error pop-up.
      localStorage.setItem("tmpURL", "/room_entrance");
      error_pop_up("You have to log in first!");
      navigate(`/login`);
    } else {
      // If the user is logged in, navigate to the room entrance page.
      navigate("/room_entrance");
    }
  };

  // Function to handle navigating to the user's rooms.
  const handleUserRooms = () => {
    const userid = localStorage.getItem("userID");
    navigate("/user_rooms");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Whatch2Gether
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/rooms">
              Room List
            </Nav.Link>
            <Nav.Link onClick={handleCreateRoom}>Create room</Nav.Link>
            <Nav.Link onClick={handleEnterTheRoom}>Enter The room</Nav.Link>
            {isAuthenticated ? (
              // If the user is authenticated, display a dropdown menu with user options.
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
                  {username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    UserID {localStorage.getItem("userID")}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleUserRooms}>
                    My Rooms
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              // If the user is not authenticated, display a "Log in" link.
              <>
                <Nav.Link as={Link} to="/login">
                  Log in
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer /> {/* Render the toast notification container for pop-ups. */}
    </Navbar>
  );
}

export default Navigation;
