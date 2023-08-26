import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import CreateNewRoom from "../pages/CreateRoom";

function useAuth() {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!localStorage.getItem("username");
  return { isAuthenticated, username };
}

function Navigation() {
  const navigate = useNavigate();
  const { isAuthenticated, username } = useAuth();

  const handleLogout = () => {
    localStorage.setItem("username", "");
    navigate("/");
  };

  const handleCreateRoom = () => {
    const username = localStorage.getItem("username");
    if (username == "") {
      navigate(`/login`);
    } else {
      const roomid = CreateNewRoom();
      navigate(`/room/${roomid}`);
    }
  };

  const handleEnterTheRoom = () => {
    const username = localStorage.getItem("username"); // Виклик функції CreateNewRoom
    if (username == "") {
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
            <Nav.Link onClick={handleCreateRoom}>Create room</Nav.Link>
            <Nav.Link onClick={handleEnterTheRoom}>Enter The room</Nav.Link>
            {isAuthenticated ? (
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
                  {username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
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
    </Navbar>
  );
}

export default Navigation;
/*<Nav.Link as={Link} to="/signup">
      Sign up
    </Nav.Link>*/
