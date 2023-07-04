import { Routes, Route, Link } from "react-router-dom";
import Room from "./pages/Room";

function App() {
  return (
    <>
      //comment
      <Routes>
        <Route path="/watch2gether/room/:key" element={<Room />} />
      </Routes>
    </>
  );
}

export default App;
