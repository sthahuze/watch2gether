import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <footer>
      <Container
        fluid
        className="pt-3 text-center"
        style={{ backgroundColor: "#f9e15d" }}
      >
        <Row className="justify-content-md-center ">
          <Col lg="10">
            <h5>
              Hochschule Anhalt. Modul Web- und Medienprogrammierung <br />
              Lehrbeauftragter: Toni Barth
            </h5>
            <Row className="justify-content-md-center">
              <Col md lg="2">
                <p>Yuliia Porokhniava</p>
              </Col>
              <Col md lg="2">
                <p> Halyna Huzenko</p>
              </Col>
              <Col md lg="2">
                <p>Arina Podoshvelieva</p>
              </Col>
              <Col md lg="2">
                <p>Nataliia Stankevych</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
