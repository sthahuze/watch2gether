import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import background from "../components/image/jvleergjp-rbvdis.jpg";

function LoadingSpinner() {
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
          <div className="loading-spinner">
            <Spinner animation="border" role="status" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoadingSpinner;
