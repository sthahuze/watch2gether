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

  async function sendRequestToServer() {
    if (isFunctionEnabled === true) {
      try {
        const response = await axios.get(`${server}/rooms/${roomid}/status`);
        const status = response.data.status;
        console.log(status, state);

        if (status !== state) {
          if (status === "playing") {
            const responsePosition = await axios.get(
              `${server}/rooms/${roomid}/position`
            );
            const position = responsePosition.data.position;

            console.log("Позиція відео:", position);

            if (isFunctionEnabled === true) {
              state = "playing";

              if (playerRef.current) {
                playerRef.current.seekTo(position);
                playerRef.current.getInternalPlayer().playVideo();
                setIsPlaying(true);
              }
            }
          }
          if (status === "paused") {
            if (isFunctionEnabled === true) {
              state = "paused";

              if (playerRef.current) {
                playerRef.current.getInternalPlayer().pauseVideo();
                setIsPlaying(false);
              }
            }
          }
        }
      } catch (error) {
        console.error("Помилка при відправці запиту:", error);
      }
    }
  }

  async function sendStatusToServer(status: string, position: number | null) {
    try {
      await axios.put(`${server}/rooms/${roomid}/status`, {
        user: userid,
        status: status,
      });

      console.log(`Запит на ${status} надіслано`);

      if (position !== null) {
        await axios.put(`${server}/rooms/${roomid}/position`, {
          user: userid,
          position: position,
        });

        console.log("Запит на позицію надіслано");
      }

      isFunctionEnabled = true;
    } catch (error) {
      console.error(`Помилка при відправці запиту на ${status}:`, error);
    }
  }

  const handlePlay = async () => {
    isFunctionEnabled = false;
    state = "playing";
    const currentPosition = playerRef.current?.getCurrentTime() || 0;
    console.log("Відео почало відтворюватися");

    await sendStatusToServer("playing", currentPosition);
  };

  const handlePause = async () => {
    state = "paused";
    setTimeout(() => {
      if (state === "playing") {
        return;
      }
    }, 50);
    isFunctionEnabled = false;
    state = "paused";
    console.log("Відео зупинилося");

    await sendStatusToServer("paused", null);
  };

  useEffect(() => {
    const intervalId = setInterval(sendRequestToServer, 920);
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
