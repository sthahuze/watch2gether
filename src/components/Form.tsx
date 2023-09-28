import { useState } from "react"; // Importing the useState hook from React.
import axios from "axios"; // Importing Axios for making HTTP requests.
import { Col, Row } from "react-bootstrap"; // Importing Bootstrap components for layout.

const server = "https://gruppe9.toni-barth.com"; // Defining the base server URL.

export const CustomForm = ({ setYoutubeLink }: any) => {
  // State management using useState hook.
  const [input, setInput] = useState(""); // State to store the user's input.
  const roomid = localStorage.getItem("roomid"); // Retrieving the room ID from local storage.
  const userID = localStorage.getItem("userID"); // Retrieving the user ID from local storage.

  // Function to handle form submission.
  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    setYoutubeLink(input); // Update the YouTube link in the parent component's state.

    // Send a PUT request to the server to update the video URL for the room.
    axios
      .put(`${server}/rooms/${roomid}/video`, { user: userID, url: input })
      .then((response) => {
        if (response.status === 200) {
          console.log("Video successfully set"); // Log a success message if the request is successful.
        } else {
          console.error("Error setting video"); // Log an error message if the request fails.
        }
      })
      .catch((error) => {
        console.error("Error setting video:", error.message); // Log an error message if there's an exception.
      });

    setInput(""); // Clear the input field after submission.
  };

  return (
    // Render a form for searching and setting a YouTube video.
    <form className="mt-4 mb-4 form-group custom-form" onSubmit={handleSubmit}>
      <Row>
        <h2>Search video:</h2>
      </Row>
      <Row>
        {/* Input field for entering a YouTube URL */}
        <Col md={9} sm={9} className="mt-2">
          <input
            type="text"
            className="form-control custom-input"
            placeholder="Enter YouTube URL"
            required
            onChange={(e) => setInput(e.target.value)} // Update the input state as the user types.
            value={input || ""} // Set the input field's value to the state.
          />
        </Col>
        {/* Submit button */}
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
