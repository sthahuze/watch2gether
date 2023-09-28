import { Col, Row } from "react-bootstrap"; // Importing Bootstrap components.
import Container from "react-bootstrap/Container"; // Importing a Bootstrap container component.

function Footer() {
  return (
    <footer>
      {/* Container for the footer section */}
      <Container
        fluid
        className="pt-3 text-center"
        style={{ backgroundColor: "#f9e15d" }}
      >
        <Row className="justify-content-md-center ">
          <Col lg="10">
            {/* Footer content */}
            <h5>
              Hochschule Anhalt. Modul Web- und Medienprogrammierung <br />
              Lehrbeauftragter: Toni Barth
            </h5>
            {/* Row to display the names */}
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
