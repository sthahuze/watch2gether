import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

const server = "https://gruppe9.toni-barth.com";

interface YoutubeProps {
  youtubeLink: string;
}

const Youtube: React.FC<YoutubeProps> = ({ youtubeLink }) => {
  const roomid = localStorage.getItem("roomid");
  const userid = localStorage.getItem("userID");
  const playerRef = useRef<ReactPlayer | null>(null);
  const [state, setState] = useState<string | null>("");

  function sendRequestToServer() {
    axios
      .get(`${server}/rooms/${roomid}/status`)
      .then((response) => {
        const status = response.data.status;
        if (status !== state) {
          console.log("Changing status");
          console.log(status);
          if (status === "play") {
            axios
              .get(`${server}/rooms/${roomid}/position`)
              .then((response) => {
                const { position } = response.data; // Отримайте позицію з відповіді
                console.log("Позиція відео:", position);
                setState("play");
              })
              .catch((error) => {
                console.error("Помилка при відправці запиту:", error);
              });
            console.log("video is set to play");
          }
          if (status === "paused") {
            setState("paused");
            console.log("video is set to paused");
          }
        }
      })
      .catch((error) => {
        console.error("Помилка при відправці запиту:", error);
      });
  }

  const handlePlay = () => {
    setState("play");
    const currentPosition = playerRef.current?.getCurrentTime() || 0;

    console.log("Відео почало відтворюватися");

    //send state
    axios
      .put(`${server}/rooms/${roomid}/status`, { user: userid, status: "play" })
      .then((response) => {
        console.log("Запит успішно відправлено");
      })
      .catch((error) => {
        console.error("Помилка при відправці запиту:", error);
      });

    //send position
    axios
      .put(`${server}/rooms/${roomid}/position`, {
        user: userid,
        position: currentPosition,
      })
      .then((response) => {
        console.log("Запит успішно відправлено");
      })
      .catch((error) => {
        console.error("Помилка при відправці запиту:", error);
      });
  };

  const handlePause = () => {
    setState("paused");

    console.log("Відео зупинилося");
    //send state
    axios
      .put(`${server}/rooms/${roomid}/status`, {
        user: userid,
        status: "status",
      })
      .then((response) => {
        console.log("Запит успішно відправлено");
      })
      .catch((error) => {
        console.error("Помилка при відправці запиту:", error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(sendRequestToServer, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <ReactPlayer
      ref={playerRef}
      url={youtubeLink}
      onPlay={handlePlay}
      onPause={handlePause}
      controls // Включити контроли відтворення
    />
  );
};

export default Youtube;
