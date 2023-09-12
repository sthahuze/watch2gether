import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
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

function useAuth() {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!localStorage.getItem("username");
  return { isAuthenticated, username };
}

function Navigation() {
  const navigate = useNavigate();
  const { isAuthenticated, username } = useAuth();

  const handleLogout = () => {
    //delete username from browser
    localStorage.removeItem("username");

    const userIdToDelete = localStorage.getItem("userID");
    //delete userID from browser
    localStorage.removeItem("userID");
    //send HttpDelete request to server
    axios
      .delete(`${server}/users/${userIdToDelete}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("User was successfully deleted");
          //pop up
          success_pop_up("User was successfully logged out");
        } else {
          console.error("Error when deleting user", response.status);
          //pop up server error
          error_pop_up("Error when deleting user::" + response.status);
        }
      })
      .catch((error) => {
        //pop up another error
        error_pop_up("Error when deleting user" + error.message);
      });
    navigate("/");
  };

  const handleCreateRoom = () => {
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userID");
    console.log(username);
    if (username === "" || username === null) {
      navigate(`/login`);
    } else {
      axios
        .post(`${server}/rooms/`)
        .then((response) => {
          if (response.status === 201) {
            const roomid = response.data.name;
            localStorage.setItem("roomid", roomid);

            axios
              .put(`${server}/rooms/${roomid}/users`, { user: userID })
              .then((response) => {
                if (response.status === 200) {
                  success_pop_up("You successfully entered the Room");
                  navigate(`/room/${roomid}`);
                } else {
                  error_pop_up("Error " + response.status);
                }
              })
              .catch((error) => {
                error_pop_up("Error " + error.message);
              });
          } else {
            //error pop up response.status
            error_pop_up("Error " + response.status);
          }
        })
        .catch((error) => {
          error_pop_up("Error " + error.message);
        });
    }
  };

  const handleEnterTheRoom = () => {
    const username = localStorage.getItem("username"); // Виклик функції CreateNewRoom
    if (username === "") {
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
