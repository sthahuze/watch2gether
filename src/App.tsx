import NavBar from "./components/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
//import LogInForm from "./components/LogInForm";
import Stack from "react-bootstrap/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LogInForm from "./pages/LogIn";
import Room from "./pages/Room";
import RoomEntrance from "./pages/RoomEntrance";
//import RoomList from "./components/RoomList";

function App() {
  return (
    <Stack>
      <NavBar />
      <BrowserRouter basename="/watch2gether">
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/room_entrance" element={<RoomEntrance />} />
        <Route path="/room/:roomid" element={<Room />} />
        <Route path="/error" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </BrowserRouter>
      <Footer />
    </Stack>
  );
}

export default App;
