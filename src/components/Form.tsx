import { useState } from "react";
import axios from "axios";

const server = "https://gruppe9.toni-barth.com";

export const CustomForm = ({ setYoutubeLink }: any) => {
  const [input, setInput] = useState("");
  const roomid = localStorage.getItem("roomid");
  const userID = localStorage.getItem("userID");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setYoutubeLink(input);
    axios
      .put(`${server}/rooms/${roomid}/video`, { user: userID, url: input })
      .then((response) => {
        if (response.status === 200) {
          console.log("Відео успішно встановлено");
        } else {
          console.error("Помилка при встановленні відео");
        }
      })
      .catch((error) => {
        console.error("Помилка при встановленні відео:", error.message);
      });
    setInput("");
  };

  return (
    <form className="mt-4 mb-5 form-group custom-form" onSubmit={handleSubmit}>
      <h2>Search video:</h2>

      <input
        type="text"
        className="form-control custom-input mt-4 mb-3"
        placeholder="Enter YouTube URL"
        required
        onChange={(e) => setInput(e.target.value)}
        value={input || ""}
      />

      <button type="submit" className="btn btn-success btn-md">
        Submit
      </button>
    </form>
  );
};

export default CustomForm;
