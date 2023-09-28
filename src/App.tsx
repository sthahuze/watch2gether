import NavBar from "./components/NavBar"; // Import the NavBar component
import { Routes, Route } from "react-router-dom"; // Import the necessary routing components from React Router
import Footer from "./components/Footer"; // Import the Footer component
import Stack from "react-bootstrap/Stack"; // Import the Stack component from React Bootstrap for layout
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS for styling
import Home from "./pages/Home"; // Import the Home page component
import NotFound from "./pages/NotFound"; // Import the NotFound page component
import LogInForm from "./pages/LogIn"; // Import the LogInForm page component
import Room from "./pages/Room"; // Import the Room page component
import RoomEntrance from "./pages/RoomEntrance"; // Import the RoomEntrance page component
import RoomList from "./pages/RoomList"; // Import the RoomList page component
import UserRooms from "./pages/UserRooms"; // Import the UserRooms page component

function App() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Stack>
        <NavBar /> {/* Render the NavBar component */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Define a route for the Home page */}
          <Route path="/login" element={<LogInForm />} /> {/* Define a route for the LogInForm page */}
          <Route path="/room_entrance" element={<RoomEntrance />} /> {/* Define a route for the RoomEntrance page */}
          <Route path="/room/:roomid" element={<Room />} /> {/* Define a route for the Room page with a dynamic roomid parameter */}
          <Route path="/rooms" element={<RoomList />} /> {/* Define a route for the RoomList page */}
          <Route path="/user_rooms" element={<UserRooms />} /> {/* Define a route for the UserRooms page */}
          <Route path="/error" element={<NotFound />} /> {/* Define a route for the NotFound page, used for error handling */}
          <Route path="/*" element={<NotFound />} /> {/* Define a catch-all route for any other undefined routes, also rendering the NotFound page */}
        </Routes>
        <Footer /> {/* Render the Footer component */}
      </Stack>
    </div>
  );
}

export default App;
