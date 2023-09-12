import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomForm } from "../components/Form";
import Youtube from "../components/Youtube";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Chat from "../components/Chat";
import axios from "axios";

const server = "https://gruppe9.toni-barth.com";

function youtube_link(setYoutubeLink: any, youtubeLink: any) {
  const roomid = localStorage.getItem("roomid");
  const userid = localStorage.getItem("userID");
  axios
    .get(`${server}/rooms/${roomid}/video`)
    .then((response) => {
      if (response.status === 200) {
        // Оновлюємо URL відео, якщо отримали відповідь від сервера
        if (response.data.url !== youtubeLink) {
          setYoutubeLink(response.data.url);
        }
      }
    })
    .catch((error) => {
      console.error("Помилка при отриманні URL відео:", error.message);
      setYoutubeLink("Error loading video"); // Встановлюємо помилкове повідомлення у разі помилки
    });
}

function Room() {
  const navigate = useNavigate();
  const [youtubeLink, setYoutubeLink] = useState<string | null>("");
  const roomid = localStorage.getItem("roomid");

  //сюди можна додати функцію, яка буде перевіряти користувачів кімнати
  function sendRequestToServer() {
    youtube_link(setYoutubeLink, youtubeLink);
  }

  useEffect(() => {
    if (roomid === "") {
      navigate(`/error`);
    } else {
      // Виконуємо запит до сервера, щоб отримати URL відео для кімнати
      youtube_link(setYoutubeLink, youtubeLink);
    }
  }, [roomid, navigate, setYoutubeLink, youtubeLink]);

  useEffect(() => {
    // Створюємо інтервал тільки після того, як компонент був змонтований
    const intervalId = setInterval(sendRequestToServer, 1000);

    // При виході з компоненту видаляємо інтервал
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
