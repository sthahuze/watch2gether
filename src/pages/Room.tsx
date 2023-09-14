import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomForm } from "../components/Form";
import Youtube from "../components/Youtube";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Chat from "../components/Chat";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipboardJS from "clipboard";

const server = "https://gruppe9.toni-barth.com";

interface User {
  id: number;
  name: string;
}

var users: User[] = [];

function new_pop_up(message: any) {
  toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
}

function left_pop_up(message: any) {
  toast(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
}

interface ArrayComparisonResult {
  equal: boolean;
  added: any[];
  removed: any[];
}

function compareArrays(array1: any[], array2: any[]): ArrayComparisonResult {
  const result: ArrayComparisonResult = {
    equal: true,
    added: [],
    removed: [],
  };

  if (array1.length !== array2.length) {
    result.equal = false;
  } else {
    // Функція для сортування за id
    const sortById = (a: { id: number }, b: { id: number }) => a.id - b.id;

    // Клонування і сортування обох масивів
    const sortedArr1 = [...array1].sort(sortById);
    const sortedArr2 = [...array2].sort(sortById);

    // Порівняння відсортованих масивів на рівність
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i].id !== sortedArr2[i].id) {
        result.equal = false;
        break;
      }
    }
  }

  // Пошук доданих та видалених елементів
  for (const item of array2) {
    if (!array1.some((element) => element.id === item.id)) {
      result.added.push(item);
    }
  }

  for (const item of array1) {
    if (!array2.some((element) => element.id === item.id)) {
      result.removed.push(item);
    }
  }

  return result;
}

function youtube_link(setYoutubeLink: any, youtubeLink: any) {
  const roomid = localStorage.getItem("roomid");

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

    // Обработчик успешного копирования
    clipboard.on("success", (e) => {
      console.log("Link copied to clipboard: ", e.text);
    });

    // Обработчик ошибок при копировании
    clipboard.on("error", (e) => {
      console.error("Failed to copy link: ", e.text);
    });

    // Убираем обработчики при размонтировании компонента
    return () => {
      clipboard.destroy();
    };
  }, []);

  const copyRoomLink = () => {
    const roomLink = `${window.location.origin}/watch2gether/room/${roomid}`;
    const dummyInput = document.createElement("input");
    document.body.appendChild(dummyInput);
    dummyInput.setAttribute("value", roomLink);
    dummyInput.select();
    document.execCommand("copy");
    document.body.removeChild(dummyInput);
  };

  function sendRequestToServer() {
    youtube_link(setYoutubeLink, youtubeLink);

    axios
      .get(`${server}/rooms/${roomid}/users`)
      .then((response) => {
        // handle success
        const all_users = response.data.users;
        if (users.length === 0) {
          users = all_users;
        } else {
          const comparisonResult = compareArrays(users, all_users);

          if (comparisonResult.equal !== true) {
            if (comparisonResult.added.length > 0) {
              // Робимо щось, коли є додані елементи
              comparisonResult.added.forEach((addedItem) => {
                console.log("User " + addedItem.name + " entered the room");
                new_pop_up("User " + addedItem.name + " entered the room");
              });
            }
            if (comparisonResult.removed.length > 0) {
              // Робимо щось, коли є видалені елементи
              comparisonResult.removed.forEach((removedItem) => {
                console.log("User " + removedItem.name + " left the room");
                new_pop_up("User " + removedItem.name + " left the room");
              });
            }
            users = all_users; // Оновлюємо стан після отримання даних
          }
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    // Створюємо інтервал тільки після того, як компонент був змонтований
    const intervalId = setInterval(sendRequestToServer, 3000);

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
