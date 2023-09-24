import { useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

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
    <form className="mt-4 mb-4 form-group custom-form" onSubmit={handleSubmit}>
      <Row>
        <h2>Search video:</h2>
      </Row>
      <Row>
        <Col md={9} sm={9} className="mt-2">
          <input
            type="text"
            className="form-control custom-input"
            placeholder="Enter YouTube URL"
            required
            onChange={(e) => setInput(e.target.value)}
            value={input || ""}
          />
        </Col>
        <Col className="col mt-2">
          <button
            type="submit"
            className="btn  btn-md w-100"
            style={{ backgroundColor: "#F3D748" }}
          >
            Submit
          </button>
        </Col>
      </Row>
    </form>
  );
};

export default CustomForm;
