import React from "react";
import { Container } from "react-bootstrap";
import { Input } from "react-chat-elements";
import { TextMessage } from "react-chat-elements";

function Chat() {
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
          {/* Здесь должны отображаться сообщения */}
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
        >
          Отправить
        </button>
      </div>
    </div>
  );
}

export default Chat;
