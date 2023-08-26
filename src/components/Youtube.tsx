import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

interface YoutubeProps {
  youtubeLink: string;
}

const Youtube: React.FC<YoutubeProps> = ({ youtubeLink }) => {
  const [seekToTime, setSeekToTime] = useState<number | null>(null);
  const [isPlaying /*, setIsPlaying*/] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    if (seekToTime !== null && playerRef.current) {
      playerRef.current.seekTo(seekToTime, "seconds");
      setSeekToTime(null);
    }
  }, [seekToTime]);

  const handlePlay = () => {
    if (playerRef.current) {
      //const currentTime = playerRef.current.getCurrentTime().toFixed(2);
      //server connection needed
      /*socket.emit("seek", {
        roomid: localStorage.getItem("roomid"),
        time: currentTime,
      });*/
      //server connection needed
      //socket.emit("play", localStorage.getItem("roomid"));
    }
  };

  const handlePause = () => {
    //server connection needed
    //socket.emit("pause", localStorage.getItem("roomid"));
  };

  /* const handlePlayVideo = () => {
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().playVideo();
      setIsPlaying(true);
    }
  };*/

  /*const handlePauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().pauseVideo();
      setIsPlaying(false);
    }
  };

  const handleConsoleSeek = (timeString: any) => {
    const time = parseInt(timeString || "", 10);
    if (!isNaN(time)) {
      setSeekToTime(time);
    }
  };*/

  useEffect(() => {
    //server connection needed
    //socket.on("seek", handleConsoleSeek);
    /*socket.on("pause", () => {
      handlePauseVideo();
    });
    //server connection needed
    //socket.on("play", handlePlayVideo);*/
  });

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
