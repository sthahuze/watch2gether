import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomForm } from "../components/Form";
import Youtube from "../components/Youtube";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import RoomList from "../components/RoomList";

function Room() {
  const navigate = useNavigate();
  const [youtubeLink, setYoutubeLink] = useState<string | null>(null);
  const roomid = localStorage.getItem("roomid");
  const username = localStorage.getItem("username");

  //no need in this construction, it was used for sockets
  //remake it
  useEffect(() => {
    const handleBeforeUnload = () => {
      // server conection needed
      localStorage.setItem("roomid", "");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("unload", handleBeforeUnload);
    };
  }, [roomid, username]);

  //no need in this construction, it was used for sockets
  //remake it
  useEffect(() => {
    if (roomid === "") {
      navigate(`/error`);
    }
  }, [roomid, navigate]);

  useEffect(() => {
    /* const receiveMessage = (data: any) => {
      console.log(data);
    };
*/
    //server connection needed
    //socket.on("receive_message", receiveMessage);

    return () => {
      //server connection needed
      //socket.off("receive_message", receiveMessage);
    };
  });

  return (
    <Container>
      <div className="Header pt-3 pb-2">You are in room: {roomid}</div>
      <Row>
        <Col lg="9">
          <div className="Video">
            <div>
              <CustomForm setYoutubeLink={setYoutubeLink} />
              <Youtube youtubeLink={youtubeLink ?? ""} />
            </div>
          </div>
        </Col>
        <Col>
          <RoomList />
        </Col>
      </Row>
    </Container>
  );
}

export default Room;
