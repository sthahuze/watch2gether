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
import {
  youtube_link,
  user_change,
  copyRoomLink,
  room_existance,
  user_in_room,
} from "../api/room_api";
import { error_pop_up } from "../api/pop_up";
import { enter_room } from "../api/enter_room";

interface User {
  id: number;
  name: string;
}

var users: User[] = [];

function Room() {
  const navigate = useNavigate();
  const [youtubeLink, setYoutubeLink] = useState<string | null>("");
  const [roomid, setRoomId] = useState<string>(""); // Використовуємо стан для збереження roomid
  var room = "";
  var FetchState = false;
  const userid = localStorage.getItem("userID");

  const fetchData = async () => {
    FetchState = true;
    // Розбийте URL на частини за допомогою регулярного виразу
    const parts = window.location.href.split("/room/");
    if (parts.length === 2) {
      room = parts[1];
      setRoomId(parts[1]);
      localStorage.setItem("roomid", room);
      console.log("roomid valid" + room);
    } else {
      localStorage.removeItem("roomid");
      navigate("/error");
    }

    localStorage.removeItem("tmpURL");
    try {
      // Перевірка, чи користувач увійшов у систему
      if (userid === "" || userid === null) {
        // Якщо користувач не увійшов у систему, викликаємо помилку та зберігаємо URL
        error_pop_up("You have to log in first!");
        localStorage.setItem("tmpURL", `/room/${room}`);

        // Перенаправляємо користувача на сторінку логіну
        navigate("/login");
      } else {
        try {
          const roomE = await room_existance(room);

          if (roomE === false) {
            localStorage.removeItem("roomid");
            error_pop_up("Room does not exist");
            navigate("/");
          } else {
            const user = await user_in_room(room);

            if (user === false) {
              console.log("user not in room");
              const entrance = await enter_room(room, userid);

              if (entrance === false) {
                localStorage.removeItem("roomid");
                navigate("/error");
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (FetchState === false) {
      fetchData();
    }

    const clipboard = new ClipboardJS(".copy-button");

    return () => {
      clipboard.destroy();
    };
  }, [FetchState]);

  useEffect(() => {
    const parts = window.location.href.split("/room/");
    if (parts.length === 2) {
      const newRoomId = parts[1];
      setRoomId(newRoomId);
      localStorage.setItem("roomid", newRoomId);
    } else {
      localStorage.removeItem("roomid");
      navigate("/error");
    }
  }, [navigate]);

  useEffect(() => {
    // Створюємо інтервал тільки після того, як компонент був змонтований
    const intervalId = setInterval(() => {
      youtube_link(setYoutubeLink, youtubeLink);
      users = user_change(users);
    }, 5000);

    // При виході з компоненту видаляємо інтервал
    return () => {
      clearInterval(intervalId);
    };
  }, [youtubeLink]);

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
