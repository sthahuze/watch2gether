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
  function sendRequestToServer() {}

  const handlePlay = () => {
    console.log("Відео почало відтворюватися"); /*
    axios
      .put(`${server}/${roomid}/status`, { user: userid, status: "play" })
      .then((response) => {
        console.log("Запит успішно відправлено");
      })
      .catch((error) => {
        console.error("Помилка при відправці запиту:", error);
      });*/
  };

  const handlePause = () => {
    console.log("Відео зупинилося");
    // Додайте ваш код для відслідковування події зупинки
  };

  const handleSeek = (time: number) => {
    console.log(`Відео перемотано до ${time} секунд`);
    // Додайте ваш код для відслідковування події перемотування
  };

  useEffect(() => {
    const intervalId = setInterval(sendRequestToServer, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <ReactPlayer
      url={youtubeLink}
      onPlay={handlePlay}
      onPause={handlePause}
      onSeek={handleSeek}
      controls // Включити контроли відтворення
    />
  );
};

export default Youtube;
