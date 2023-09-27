import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomForm } from "../components/Form";
import Youtube from "../components/Youtube";
import Container from "react-bootstrap/Container";
import { Button, Col, Row } from "react-bootstrap";
import Chat from "../components/Chat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipboardJS from "clipboard";
import { FaShare } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  youtube_link,
  user_change,
  copyRoomLink,
  room_existance,
  user_in_room,
} from "../api/room_api";
import { error_pop_up, info_pop_up, success_pop_up } from "../api/pop_up";
import { enter_room } from "../api/enter_room";

function Room() {
  const navigate = useNavigate();
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  var currentYoutubeLink: string | null = "";
  const [roomid, setRoomId] = useState<string>(""); // Використовуємо стан для збереження roomid
  const [isLoading, setIsLoading] = useState(true);
  var room = "";
  var FetchState = false;
  const userid = localStorage.getItem("userID");

  interface User {
    id: number;
    name: string;
  }

  var users: User[] = [];

  const fetchData = async () => {
    setIsLoading(true);
    FetchState = true;
    // Розбийте URL на частини за допомогою регулярного виразу
    const parts = window.location.href.split("/room/");
    if (parts.length === 2) {
      room = parts[1];

      localStorage.setItem("roomid", room);
      console.log("roomid valid" + room);
    } else {
      localStorage.removeItem("roomid");
      setIsLoading(false);
      localStorage.removeItem("tmpURL");
      navigate("/error");
    }

    localStorage.removeItem("tmpURL");
    try {
      const roomE = await room_existance(room);

      if (roomE === false) {
        localStorage.removeItem("roomid");
        error_pop_up("Room does not exist");
        setIsLoading(false);
        navigate("/");
      } else {
        // Перевірка, чи користувач увійшов у систему
        if (userid === "" || userid === null) {
          // Якщо користувач не увійшов у систему, викликаємо помилку та зберігаємо URL
          error_pop_up("You have to log in first!");
          localStorage.setItem("tmpURL", `/room/${room}`);

          // Перенаправляємо користувача на сторінку логіну
          setIsLoading(false);
          navigate("/login");
        } else {
          setRoomId(room);
          try {
            const user = await user_in_room(room);

            if (user === false) {
              console.log("user not in room");
              const entrance = await enter_room(room, userid);

              if (entrance === false) {
                localStorage.removeItem("roomid");
                setIsLoading(false);
                navigate("/error");
              }
            }
          } catch (error) {
            setIsLoading(false);
            console.error(error);
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }

    setIsLoading(false);
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
    if (roomid !== "") {
      const parts = window.location.href.split("/room/");
      if (parts.length === 2) {
        const newRoomId = parts[1];
        setRoomId(newRoomId);
        localStorage.setItem("roomid", newRoomId);
      } else {
        localStorage.removeItem("roomid");
        navigate("/error");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDataAndHandleAsync = async () => {
      try {
        await youtube_link(setYoutubeLink, youtubeLink);
        users = await user_change(users);

        // Оновлюємо currentYoutubeLink лише якщо youtubeLink змінилося
        if (youtubeLink !== currentYoutubeLink) {
          currentYoutubeLink = youtubeLink;
          info_pop_up("New Video!");
        }
      } catch (error) {
        // Обробляйте помилки, якщо потрібно
      }
    };

    // Створюємо інтервал тільки після того, як компонент був змонтований
    const intervalId = setInterval(() => {
      fetchDataAndHandleAsync();
    }, 2500);

    // При виході з компоненту видаляємо інтервал
    return () => {
      users = [];
      clearInterval(intervalId);
    };
  }, [youtubeLink]);

  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    copyRoomLink(); // Копирование ссылки в буфер обмена
    success_pop_up("Link is copied to clipboard"); // Отображение уведомления
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner /> // Відобразиться, поки сторінка завантажується
      ) : (
        <Container>
          <Row className="pt-1">
            <Col lg={8}>
              <Row className="mt-2 pb-4 pb-sm-2">
                <Col
                  md="auto"
                  sm="5"
                  className="pt-md-3 pt-2 justify-content-center justify-content-sm-end d-flex"
                >
                  <h4>You are in room: </h4>
                </Col>
                <Col
                  md="auto"
                  sm="7"
                  className="pt-md-3 pt-2 justify-content-center justify-content-sm-start d-flex"
                >
                  <h4>{roomid}</h4>
                </Col>
                <Col className="col justify-content-lg-end justify-content-center d-flex pt-md-3 pt-sm-2 pt-2">
                  <Button
                    className="copy-button btn w-100"
                    style={{
                      backgroundColor: isActive ? "#FFEA99" : "#F3D748",
                      transition: "background-color 0.1s ease",
                      color: "black",
                      border: "none",
                      maxWidth: "300px",
                    }}
                    onMouseDown={() => setIsActive(true)}
                    onMouseUp={() => setIsActive(false)}
                    onClick={handleButtonClick}
                  >
                    <FaShare /> Share
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="Video">
                    <CustomForm setYoutubeLink={setYoutubeLink} />
                    {youtubeLink === "Loading..." ? ( // Перевіряємо, чи URL відео готовий
                      <p>Loading video...</p> // Відображаємо заставку поки відео завантажується
                    ) : (
                      <Youtube youtubeLink={youtubeLink ?? ""} />
                    )}
                  </div>
                </Col>
              </Row>
              <ToastContainer />
            </Col>
            <Col className="pt-1">
              <Chat />
            </Col>
          </Row>
        </Container>
      )}
      <ToastContainer />
    </div>
  );
}

export default Room;
