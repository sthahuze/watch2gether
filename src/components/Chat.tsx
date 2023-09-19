import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Input, TextMessage } from "react-chat-elements";
import axios from "axios";
import styled from "styled-components";

const server = "https://gruppe9.toni-barth.com";

const ChatMessageContainer = styled.div`
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 8px;
  margin: 4px;
`;

interface User {
  id: number;
  name: string;
}

var users: User[] = [];

function Chat() {
  const [messageText, setMessageText] = useState(""); // Стан для зберігання тексту повідомлення
  const [chatMessages, setChatMessages] = useState([]); // Стан для зберігання повідомлень
  const roomid = localStorage.getItem("roomid");
  const userid = localStorage.getItem("userID");

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
    const intervalId = setInterval(() => {
      // Відправка GET-запиту для отримання повідомлень
      axios
        .get(`${server}/rooms/${roomid}/chat`)
        .then((response) => {
          const messages = response.data.messages;
          setChatMessages(messages);
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
  }, [roomid]); // Видаліть chatMessages зі залежностей

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Container className="pt-3 pb-3">
        <h3>Chat</h3>
      </Container>
      <div
        style={{
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        {/* Вывод сообщений */}
        <div
          className="messages"
          style={{
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          {chatMessages.map((message: any) => (
            <div key={message.id}>
              <p>{getUsernameByUserId(message.userId)}</p>
              <ChatMessageContainer>
                <p>{message.text}</p>
              </ChatMessageContainer>
            </div>
          ))}
        </div>

        <div
          style={{
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <Input
            placeholder="Type here..."
            multiline={true}
            maxHeight={120}
            inputStyle={{
              width: "100%",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
            value={messageText} // Підключаємо значення зі стану до поля вводу
            onChange={(e: any) => setMessageText(e.target.value)} // Обробник зміни тексту
          />
        </div>

        <button
          style={{
            marginTop: "5px",
            marginBottom: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            fontSize: "16px",
            padding: "8px 8px",
            backgroundColor: "green",
            color: "white",
          }}
          onClick={handleSendMessage} // Прикріплюємо обробник натискання кнопки
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
