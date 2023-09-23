import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { error_pop_up } from "../api/pop_up";

const server = "https://gruppe9.toni-barth.com";

function RoomList() {
  const [list, setList] = useState<string[]>([]);

  function update_room_list() {
    axios
      .get(`${server}/rooms`)
      .then((response) => {
        const roomNames = response.data.rooms.map((room: any) => room.name);
        setList(roomNames);
      })
      .catch((error) => {
        error_pop_up("Error uploading rooms" + error.message);
        console.log(error);
      });
  }

  useEffect(() => {
    update_room_list();
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <Container className="pt-4 pb-3 ">
        <Row>
          <Col
            sm="9"
            className="justify-content-center justify-content-sm-start d-flex"
          >
            <h1>List of open rooms</h1>
          </Col>
          <Col sm="3" className="mt-2 mb-1 justify-content-end d-flex">
            <Button
              variant="info"
              onClick={update_room_list}
              className="w-100"
              style={{ backgroundColor: "#F3D748", border: "none" }}
            >
              <FontAwesomeIcon icon={faSync} />
              Update
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="mb-5">
  <ListGroup>
    {list.map((item, index) => (
      <ListGroup.Item key={index}>
        {item.length > 5 ? item.slice(0, 5) + "*****" : item}
      </ListGroup.Item>
    ))}
  </ListGroup>
</Container>
      <ToastContainer />
    </div>
  );
}

export default RoomList;
