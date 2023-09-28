import React from "react"; // Importing React library for creating a component.
import Spinner from "react-bootstrap/Spinner"; // Importing Bootstrap Spinner component.
import { Container, Row, Col } from "react-bootstrap"; // Importing Bootstrap components for layout.
import background from "../components/image/jvleergjp-rbvdis.jpg"; // Importing a background image.

function LoadingSpinner() {
  return (
    <Container
      className="vh-100 d-flex justify-content-center align-items-center" // Styling the container to center its content vertically and horizontally.
      fluid // Making the container take up the full viewport height.
      style={{
        backgroundPosition: "center", // Setting the background image position to the center.
        backgroundSize: "cover", // Setting the background image size to cover the container.
        backgroundImage: `url(${background})`, // Setting the background image using the imported image.
      }}
    >
      <Row className="justify-content-md-center">
        <Col>
          <div className="loading-spinner">
            <Spinner animation="border" role="status" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoadingSpinner;
