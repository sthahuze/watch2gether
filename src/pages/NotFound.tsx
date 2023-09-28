import { Container, Row, Col } from "react-bootstrap"; // Importing Bootstrap components for layout.
import background from "../components/image/jvleergjp-rbvdis.jpg"; // Importing a background image.

function NotFound() {
  return (
    <Container
      className="vh-100 d-flex justify-content-center align-items-center"
      fluid
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${background})`, // Applying a background image to the container for styling.
      }}
    >
      <Row className="justify-content-center">
        <Col>
          <div className="text-center">
            <h1 className="mt-5">404 Not Found</h1> {/* Displaying a 404 error message as a heading. */}
            <p>The requested page does not exist.</p> {/* Providing a brief description of the error. */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
