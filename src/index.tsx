// Import React and ReactDOM from their respective libraries
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the root component of the application, which is the "App" component
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter from React Router to enable client-side routing
import reportWebVitals from "./reportWebVitals"; // Import reportWebVitals to measure and report performance metrics

// Create a new React root using ReactDOM.createRoot() and specify the target DOM element
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render the main application content within the React root
root.render(
  <React.StrictMode>
    {/* Use BrowserRouter to enable client-side routing with a specified "basename" */}
    <BrowserRouter basename="/watch2gether">
      {/* Wrap the entire application with React Strict Mode */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Measure and report web vitals for performance monitoring
reportWebVitals();
