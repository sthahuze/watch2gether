import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { success_pop_up, error_pop_up } from "../api/pop_up";

const server = "https://gruppe9.toni-barth.com";

function useAuth() {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!localStorage.getItem("username");
  return { isAuthenticated, username };
}

function Navigation() {
  const navigate = useNavigate();
  const { isAuthenticated, username } = useAuth();

  const handleLogout = async (e: any) => {
    // Додайте `async` тут
    e.preventDefault();
    //delete username from browser
    localStorage.removeItem("username");

    const userIdToDelete = localStorage.getItem("userID");
    //delete userID from browser
    localStorage.removeItem("userID");
    localStorage.removeItem("roomid");

    try {
      const response = await axios.delete(`${server}/users/${userIdToDelete}`);
      if (response.status === 200) {
        //pop up
        success_pop_up("User was successfully logged out");
      } else {
        console.error("Error when deleting user", response.status);
        //pop up server error
        error_pop_up("Error when deleting user::" + response.status);
      }
    } catch (error) {
      //pop up another error
      error_pop_up("Error when deleting user");
    }
    navigate("/");
  };

  const handleCreateRoom = async (e: any) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userID");
    console.log(username);

    try {
      const response = await axios.post(`${server}/rooms/`);
      if (response.status === 201) {
        const roomid = response.data.name;
        // localStorage.setItem("roomid", roomid);

        if (userID === "" || userID === null) {
          localStorage.setItem("tmpURL", `/room/${roomid}`);
          error_pop_up("You have to log in first!");
          navigate("/login");
        } else {
          try {
            const userResponse = await axios.put(
              `${server}/rooms/${roomid}/users`,
              { user: userID }
            );
            if (userResponse.status === 200) {
              success_pop_up("You successfully created and entered the Room");
              navigate(`/room/${roomid}`);
            } else {
              error_pop_up("Error " + userResponse.status);
            }
          } catch (error) {
            error_pop_up("Error ");
          }
        }
      } else {
        //error pop up response.status
        error_pop_up("Error " + response.status);
      }
    } catch (error) {
      error_pop_up("Error ");
    }
  };

  const handleEnterTheRoom = () => {
    const username = localStorage.getItem("username"); // Виклик функції CreateNewRoom
    if (username === "" || username === null) {
      localStorage.setItem("tmpURL", "/room_entrance");
      error_pop_up("You have to log in first!");
      navigate(`/login`);
    } else {
      navigate("/room_entrance");
    }
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
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
                  {username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    UserID {localStorage.getItem("userID")}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Log in
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer />
    </Navbar>
  );
}

export default Navigation;
