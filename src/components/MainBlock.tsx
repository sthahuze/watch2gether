import background from "./image/jvleergjp-rbvdis.jpg";
import { Col, Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { success_pop_up, error_pop_up } from "../api/pop_up";

const server = "https://gruppe9.toni-barth.com";

function MainBlock() {
  const navigate = useNavigate();
  const handleCreateRoom = () => {
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userID");
    if (username === "" || username === null) {
      error_pop_up("You have to log in first!");
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
      <ToastContainer />
    </Container>
  );
}

export default MainBlock;
