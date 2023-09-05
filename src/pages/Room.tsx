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

  useEffect(() => {
    if (roomid === "") {
      navigate(`/error`);
    }
  }, [roomid, navigate]);

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
