import React, { useState, useRef, useEffect } from "react"; // Importing necessary React components and hooks.
import ReactPlayer from "react-player"; // Importing the ReactPlayer component for rendering videos.
import axios from "axios"; // Importing Axios for making HTTP requests.
import { info_pop_up } from "../api/pop_up"; // Importing a custom pop-up function.

const server = "https://gruppe9.toni-barth.com"; // Define the server URL.
var state = ""; // Initialize a variable to track the video playback state.
let isFunctionEnabled = true; // Initialize a flag to enable/disable certain functions.

// Define the properties expected by the Youtube component.
interface YoutubeProps {
  youtubeLink: string;
}

const Youtube: React.FC<YoutubeProps> = ({ youtubeLink }) => {
  // Retrieve room ID and user ID from local storage.
  const roomid = localStorage.getItem("roomid");
  const userid = localStorage.getItem("userID");

  // Initialize state to track video playback.
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Create a reference to the ReactPlayer component.
  const playerRef = useRef<ReactPlayer | null>(null);

  // Function to send a request to the server to check video playback status.
  async function sendRequestToServer() {
    if (isFunctionEnabled === true) {
      try {
        // Send a GET request to get the current room status from the server.
        const response = await axios.get(`${server}/rooms/${roomid}/status`);
        const status = response.data.status;

        // Compare the received status with the local state.
        if (status !== state) {
          if (status === "playing") {
            // If the status is "playing," get the current video position from the server.
            const responsePosition = await axios.get(
              `${server}/rooms/${roomid}/position`
            );
            const position = responsePosition.data.position;

            // Set the local state to "playing" and seek to the received position.
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
            // If the status is "paused," pause the video.
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
        console.error("Error sending request:", error);
      }
    }
  }

  // Function to send the current video status and position to the server.
  async function sendStatusToServer(status: string, position: number | null) {
    try {
      // Send a PUT request to update the room status on the server.
      await axios.put(`${server}/rooms/${roomid}/status`, {
        user: userid,
        status: status,
      });

      // Log that the request has been sent.
      console.log(`Request for ${status} sent`);

      if (position !== null) {
        // If a position is provided, send a PUT request to update the position on the server.
        await axios.put(`${server}/rooms/${roomid}/position`, {
          user: userid,
          position: position,
        });

        // Log that the request for position update has been sent.
        console.log("Request for position sent");
      }

      isFunctionEnabled = true; // Re-enable the function after sending the request.
    } catch (error) {
      console.error(`Error sending ${status} request:`, error);
    }
  }

  // Function to handle video play.
  const handlePlay = async () => {
    isFunctionEnabled = false;
    state = "playing";
    const currentPosition = playerRef.current?.getCurrentTime() || 0;
    console.log("Video playback started");
    info_pop_up("Video started");
    await sendStatusToServer("playing", currentPosition);
  };

  // Function to handle video pause.
  const handlePause = async () => {
    state = "paused";
    setTimeout(() => {
      if (state === "playing") {
        return;
      }
    }, 100);
    isFunctionEnabled = false;
    state = "paused";
    console.log("Video paused");
    info_pop_up("Video paused");
    await sendStatusToServer("paused", null);
  };

  // UseEffect hook to periodically send requests to check the video status.
  useEffect(() => {
    const intervalId = setInterval(sendRequestToServer, 920);
    return () => {
      clearInterval(intervalId);
    };
  }, [roomid, userid]);

  return (
    <div className="mb-5">
      {/* Render the ReactPlayer component to play the YouTube video. */}
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
