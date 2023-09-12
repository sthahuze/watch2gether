import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

const server = "https://gruppe9.toni-barth.com";
var state = "";
let isFunctionEnabled = true;

interface YoutubeProps {
  youtubeLink: string;
}

const Youtube: React.FC<YoutubeProps> = ({ youtubeLink }) => {
  const roomid = localStorage.getItem("roomid");
  const userid = localStorage.getItem("userID");
  const [seekToTime, setSeekToTime] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer | null>(null);

  function sendRequestToServer() {
    if (isFunctionEnabled === true) {
      axios
        .get(`${server}/rooms/${roomid}/status`)
        .then((response) => {
          const status = response.data.status;
          console.log(status, state);
          if (status !== state) {
            if (status === "playing") {
              axios
                .get(`${server}/rooms/${roomid}/position`)
                .then((response) => {
                  const { position } = response.data; // Отримайте позицію з відповіді
                  console.log("Позиція відео:", position);
                  state = "playing";
                  if (playerRef.current) {
                    playerRef.current.seekTo(position);
                    playerRef.current.getInternalPlayer().playVideo();
                    setIsPlaying(true);
                  }
                })
                .catch((error) => {
                  console.error("Error when getting position:", error);
                });
              console.log("video is set to play");
            }
            if (status === "paused") {
              state = "paused";
              if (playerRef.current) {
                playerRef.current.getInternalPlayer().pauseVideo();
                setIsPlaying(false);
              }
              console.log("video is set to paused");
            }
          }
        })
        .catch((error) => {
          console.error("Помилка при відправці запиту:", error);
        });
    }
  }

  const handlePlay = () => {
    isFunctionEnabled = false;
    state = "playing";
    const currentPosition = playerRef.current?.getCurrentTime() || 0;
    console.log("Відео почало відтворюватися");

    //send state
    axios
      .put(`${server}/rooms/${roomid}/status`, {
        user: userid,
        status: "playing",
      })
      .then((response) => {
        console.log("state: " + state);
        console.log("Запит на play надіслано");
        axios
          .put(`${server}/rooms/${roomid}/position`, {
            user: userid,
            position: currentPosition,
          })
          .then((response) => {
            console.log("Запит на позицію надіслано");
            isFunctionEnabled = true;
          })
          .catch((error) => {
            console.error("Помилка при відправці запиту:", error);
          });
      })
      .catch((error) => {
        console.error("Помилка при відправці запиту:", error);
      });

    //send position
  };

  const handlePause = () => {
    isFunctionEnabled = false;
    state = "paused";
    console.log("Відео зупинилося");
    //send state
    axios
      .put(`${server}/rooms/${roomid}/status`, {
        user: userid,
        status: "paused",
      })
      .then((response) => {
        console.log("Запит на паузу надіслано");
        isFunctionEnabled = true;
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
  }, [sendRequestToServer]);

  return (
    <div className="mb-5">
      <ReactPlayer
        ref={playerRef}
        url={youtubeLink}
        controls
        playing={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        width="100%"
      />
    </div>
  );
};

export default Youtube;
