import { Container, Row, Col } from "react-bootstrap";
import background from "../components/image/jvleergjp-rbvdis.jpg";

function NotFound() {
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
      <Row className="justify-content-center">
        <Col>
          <div className="text-center">
            <h1 className="mt-5">404 Not Found</h1>
            <p>The requested page does not exist.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
