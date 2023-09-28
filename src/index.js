import "bootstrap/dist/css/bootstrap.css"; // Import the Bootstrap CSS to apply Bootstrap styling to the application
import React from "react"; // Import necessary React libraries for building the app
import ReactDOM from "react-dom"; // Import necessary React libraries for building the app
import App from "./App"; // Import the root component of the application, which is the "App" component
import { BrowserRouter } from "react-router-dom"; // Import the BrowserRouter component from React Router to enable client-side routing

// Render the main application content into the HTML root element with the ID "root"
ReactDOM.render(
  // Use the BrowserRouter component to wrap the entire application.
  // The "basename" prop is set to "/watch2gether", which is the base URL for the app.
  // This prop is helpful when deploying the app to a subdirectory on a web server.
  <BrowserRouter basename="/watch2gether">
    {/* Render the "App" component, which contains the entire application */}
    <App />
  </BrowserRouter>,
  // Specify the HTML element with the ID "root" where the app will be rendered
  document.getElementById("root")
);
