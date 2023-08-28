import { useState } from "react";

export const CustomForm = ({ setYoutubeLink }: any) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setYoutubeLink(input);
    //empty
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
