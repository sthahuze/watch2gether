import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { get_user_rooms } from "../api/get_user_rooms";
import LoadingSpinner from "../components/LoadingSpinner";

function UserRooms() {
  var isLoading = true;
  const navigate = useNavigate();
  const userid = localStorage.getItem("userID");
  const [list, setList] = useState<string[] | undefined>([]);

  async function update_room_list() {
    const user_rooms = await get_user_rooms(userid);
    setList(user_rooms);
    isLoading = false;
  }

  useEffect(() => {
    update_room_list();
  }, []);

  const handleItemClick = (roomid: string) => {
    // Handle the item click here, for example, navigate to a new page or perform an action.
    navigate(`/room/${roomid}`);
    console.log("Item clicked:", roomid);
  };

  return (
    <div style={{ flex: 1 }}>
      <Container className="pt-4 pb-3 ">
        <Row>
          <Col
            sm="9"
            className="justify-content-center justify-content-sm-start d-flex"
          >
            <h1>List of open rooms of user</h1>
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
          {list?.map((item, index) => (
            <ListGroup.Item key={index}>
              <Button variant="link" onClick={() => handleItemClick(item)}>
                {item}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default UserRooms;
