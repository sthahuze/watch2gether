import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { info_pop_up } from "../api/pop_up";

const server = "https://gruppe9.toni-barth.com";

const ChatMessageContainer = styled.div`
  border: none;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 5px;
  margin: 2px;
  word-wrap: break-word;

  h6 {
    margin: 1px 0;
    font-size: 14px; /* Зменшуємо розмір шрифту */
    color: #f85e00; /* Змінюємо колір тексту на сірий */
  }

  p {
    margin: 1px 0;
  }
`;

interface User {
  id: number;
  name: string;
}

var users: User[] = [];

function Chat() {
  const isScreen = window.matchMedia("(min-width: 992px)").matches;
  const height = isScreen ? "70vh" : "52vh";

  const [messageText, setMessageText] = useState(""); // Стан для зберігання тексту повідомлення
  const [chatMessages, setChatMessages] = useState([]); // Стан для зберігання повідомлень
  const roomid = localStorage.getItem("roomid");
  const userid = localStorage.getItem("userID");
  const [initialRequestCompleted, setInitialRequestCompleted] = useState(false);
  const [previousMessageCount, setPreviousMessageCount] = useState([]);

  function getUsernameByUserId(userId: number) {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  }

  const handleSendMessage = () => {
    if (messageText?.trim() === "") {
      return; // Не відправляти порожні повідомлення
    }
    axios
      .put(`${server}/rooms/${roomid}/chat`, {
        user: userid,
        message: messageText,
      })
      .then((response) => {
        console.log("Запит успішно відправлено");
      })
      .catch((error) => {
        console.error("Помилка відправки запиту:", error);
      });

    setMessageText("");
  };

  useEffect(() => {
    if (!initialRequestCompleted) {
      // Выполните первый запрос только если он ещё не был выполнен
      axios
        .get(`${server}/rooms/${roomid}/chat`)
        .then((response) => {
          const messages = response.data.messages;
          setChatMessages(messages);

          // Установите начальное значение previousMessageCount
          setPreviousMessageCount(messages.length);

          // Установите флаг, что первый запрос выполнен
          setInitialRequestCompleted(true);
        })
        .catch((error) => {
          console.error("Помилка отримання повідомлень:", error);
        });
    }

    const intervalId = setInterval(() => {
      // Відправка GET-запиту для отримання повідомлень
      axios
        .get(`${server}/rooms/${roomid}/chat`)
        .then((response) => {
          const messages = response.data.messages;
          setChatMessages(messages);

          const filteredMessages = messages.filter(
            (message: { userId: string }) => {
              return message.userId != userid;
            }
          );

          // Проверка, есть ли новые сообщения
          if (filteredMessages.length > previousMessageCount) {
            info_pop_up("New message in chat!"); // Вызываем поп-ап только если есть новые входящие сообщения
          }

          // Обновляем состояние с предыдущим количеством сообщений
          setPreviousMessageCount(filteredMessages.length);
        })
        .catch((error) => {
          console.error("Помилка отримання повідомлень:", error);
        });

      axios
        .get(`${server}/rooms/${roomid}/users`)
        .then((response) => {
          users = response.data.users;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [roomid, initialRequestCompleted, previousMessageCount]); // Видаліть chatMessages зі залежностей

  const [isActive, setIsActive] = useState(false);

  return (
    <Container
      className="pt-4 mb-4 pb-4"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <h3 className="text-center">Chat</h3>

      {/* Вывод сообщений */}
      <div
        className="messages pb-2 pt-3 mt-4"
        style={{
          height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflowY: "auto",
        }}
      >
        {chatMessages.map((message: any) => (
          <div key={message.id}>
            <ChatMessageContainer>
              <h6>{getUsernameByUserId(message.userId)}</h6>
              <p>{message.text}</p>
            </ChatMessageContainer>
          </div>
        ))}
      </div>

      <Row>
        <Col md={9}>
          <input
            type="text"
            className="form-control"
            placeholder="Type here..."
            value={messageText}
            onChange={(e: any) => setMessageText(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <button
            className="btn w-100"
            style={{
              backgroundColor: isActive ? "#FFEA99" : "#F3D748",
              transition: "background-color 0.1s ease",
              border: "none",
            }}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onClick={handleSendMessage}
          >
            Send
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
