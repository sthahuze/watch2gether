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
                  if (isFunctionEnabled === true) {
                    state = "playing";
                    if (playerRef.current) {
                      playerRef.current.seekTo(position);
                      playerRef.current.getInternalPlayer().playVideo();
                      setIsPlaying(true);
                    }
                  }
                })
                .catch((error) => {
                  console.error("Error when getting position:", error);
                });
              console.log("video is set to play");
            }
            if (status === "paused") {
              if (isFunctionEnabled === true) {
                state = "paused";
                if (playerRef.current) {
                  playerRef.current.getInternalPlayer().pauseVideo();
                  setIsPlaying(false);
                }
                console.log("video is set to paused");
              }
            }
          }
        })
        .catch((error) => {
          console.error("Помилка при відправці запиту:", error);
        });
    }
  }

  function sendStatusToServer(status: string, position: number | null) {
    axios
      .put(`${server}/rooms/${roomid}/status`, {
        user: userid,
        status: status,
      })
      .then((response) => {
        console.log(`Запит на ${status} надіслано`);
      })
      .catch((error) => {
        console.error(`Помилка при відправці запиту на ${status}:`, error);
      });

    if (position !== null) {
      axios
        .put(`${server}/rooms/${roomid}/position`, {
          user: userid,
          position: position,
        })
        .then((response) => {
          console.log("Запит на позицію надіслано");
        })
        .catch((error) => {
          console.error("Помилка при відправці запиту на позицію:", error);
        });
    }
    isFunctionEnabled = true;
  }

  const handlePlay = () => {
    isFunctionEnabled = false;
    state = "playing";
    const currentPosition = playerRef.current?.getCurrentTime() || 0;
    console.log("Відео почало відтворюватися");

    sendStatusToServer("playing", currentPosition);
  };

  const handlePause = () => {
    isFunctionEnabled = false;
    state = "paused";
    console.log("Відео зупинилося");

    sendStatusToServer("paused", null);
  };

  useEffect(() => {
    const intervalId = setInterval(sendRequestToServer, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [roomid, userid]);

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
