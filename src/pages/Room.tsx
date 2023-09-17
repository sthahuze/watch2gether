import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomForm } from "../components/Form";
import Youtube from "../components/Youtube";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Chat from "../components/Chat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipboardJS from "clipboard";
import { youtube_link, user_change, copyRoomLink } from "../api/room_api";

function Room() {
  const navigate = useNavigate();
  const [youtubeLink, setYoutubeLink] = useState<string | null>("");
  const roomid = localStorage.getItem("roomid");

  useEffect(() => {
    if (roomid === "") {
      navigate(`/error`);
    } else {
      // Виконуємо запит до сервера, щоб отримати URL відео для кімнати
      youtube_link(setYoutubeLink, youtubeLink);
    }
  }, [roomid, navigate, setYoutubeLink, youtubeLink]);

  useEffect(() => {
    // Инициализация ClipboardJS
    const clipboard = new ClipboardJS(".copy-button");
    // Убираем обработчики при размонтировании компонента
    return () => {
      clipboard.destroy();
    };
  }, []);

  useEffect(() => {
    // Створюємо інтервал тільки після того, як компонент був змонтований
    const intervalId = setInterval(() => {
      youtube_link(setYoutubeLink, youtubeLink);
      user_change();
    }, 3000);

    // При виході з компоненту видаляємо інтервал
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container>
      <div className="Header pt-3 pb-2">You are in room: {roomid}</div>
      <button className="copy-button btn btn-success" onClick={copyRoomLink}>
        Copy Link
      </button>
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
      <ToastContainer />
    </Container>
  );
}

export default Room;
