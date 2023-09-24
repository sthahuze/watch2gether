import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Stack from "react-bootstrap/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LogInForm from "./pages/LogIn";
import Room from "./pages/Room";
import RoomEntrance from "./pages/RoomEntrance";
import RoomList from "./pages/RoomList";

function App() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Stack>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<LogInForm />} />
          <Route path="/" element={<RoomEntrance />} />
          <Route path="/" element={<Room />} />
          <Route path="/" element={<RoomList />} />
          <Route path="/" element={<NotFound />} />
          <Route path="/" element={<NotFound />} />
        </Routes>
        <Footer />
      </Stack>
    </div>
  );
}

export default App;
