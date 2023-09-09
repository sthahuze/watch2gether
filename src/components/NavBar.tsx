import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const server = "https://gruppe9.toni-barth.com";

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
    localStorage.setItem("username", "");
    const userIdToDelete = localStorage.getItem("userID");
    //delete userID from browser
    localStorage.setItem("userID", "");
    //send HttpDelete request to server
    axios
      .delete(`${server}/users/${userIdToDelete}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("User was successfully deleted");
          //pop up
          toast.success("User was successfully logged out", {
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
          console.error("Error when deleting user", response.status);
          //pop up server error
          toast.error("Error when deleting user", {
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
        //pop up another error
        toast.error("Error when deleting user" + error.message, {
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
    navigate("/");
  };

  const handleCreateRoom = () => {
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userID");
    if (username === "") {
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
          } else {
            //error pop up response.status
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
/*<Nav.Link as={Link} to="/signup">
      Sign up
    </Nav.Link>*/
