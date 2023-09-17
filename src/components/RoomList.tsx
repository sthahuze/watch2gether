import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

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
        toast.error("Error uploading rooms" + error.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        console.log(error);
      });
  }

  useEffect(() => {
    update_room_list();
  }, []);

  return (
    <div>
      <Container className="pt-4 pb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-center pb-2">List of open rooms</h1>
          <Button variant="info" onClick={update_room_list}>
            <FontAwesomeIcon icon={faSync} className="mr-2" />
            Update
          </Button>
        </div>
        <ListGroup>
          {list.map((item, index) => (
            <ListGroup.Item key={index}>{item}</ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default RoomList;
