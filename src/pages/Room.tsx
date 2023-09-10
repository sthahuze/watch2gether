import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomForm } from "../components/Form";
import Youtube from "../components/Youtube";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Chat from "../components/Chat";
import axios from "axios";

const server = "https://gruppe9.toni-barth.com";

function Room() {
  const navigate = useNavigate();
  const [youtubeLink, setYoutubeLink] = useState<string | null>("");
  const roomid = localStorage.getItem("roomid");
  console.log(roomid);

  useEffect(() => {
    if (roomid === "") {
      navigate(`/error`);
    } else {
      // Виконуємо запит до сервера, щоб отримати URL відео для кімнати
      axios
        .get(`${server}/rooms/${roomid}/video`)
        .then((response) => {
          if (response.status === 200) {
            // Оновлюємо URL відео, якщо отримали відповідь від сервера
            setYoutubeLink(response.data.url);
          }
        })
        .catch((error) => {
          console.error("Помилка при отриманні URL відео:", error.message);
          setYoutubeLink("Error loading video"); // Встановлюємо помилкове повідомлення у разі помилки
        });
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
              {youtubeLink === "Loading..." ? ( // Перевіряємо, чи URL відео готовий
                <p>Loading video...</p> // Відображаємо заставку поки відео завантажується
              ) : (
                <Youtube youtubeLink={youtubeLink ?? ""} />
              )}
            </div>
          </div>
        </Col>
        <Col>
          <Chat />
        </Col>
      </Row>
    </Container>
  );
}

export default Room;
