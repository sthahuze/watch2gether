import background from "./image/jvleergjp-rbvdis.jpg";
import { Col, Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateNewRoom from "../pages/CreateRoom";

function MainBlock() {
  const navigate = useNavigate();
  const handleCreateRoom = () => {
    const roomid = CreateNewRoom(); // Виклик функції CreateNewRoom
    if (roomid == "") {
      navigate(`/login`);
    } else {
      navigate(`/room/${roomid}`);
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
    </Container>
  );
}

export default MainBlock;
