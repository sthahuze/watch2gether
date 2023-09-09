import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const server = "https://gruppe9.toni-barth.com";

function RoomList() {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
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
  }, []);

  const isSmallScreen = window.innerWidth < 768;
  const containerHeight = isSmallScreen ? 260 : 580;

  return (
    <div
      style={{
        height: `${containerHeight}px`,
        background: "lightgray",
        overflowY: "scroll",
      }}
      className="mb-5"
    >
      <Container className="pr-4 pl-4 pt-3 pb-3">
        <h4 className="text-center pb-2">List of open rooms</h4>
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
