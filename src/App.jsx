// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import VideoPlayer from "./components/VideoPlayer";

const App = () => {
  const videoId = "video-01";
  const userId = localStorage.getItem("userId");
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Home route opens Register page */}
        <Route path="/" element={<Register />} />
        <Route path="/Register" element={<Register />} />

        {/* Auth routes */}
        <Route path="/Login" element={<Login />} />
        {/* Wildcard */}
        <Route
          path="/VideoPlayer"
          element={
            isAuthenticated ? (
              <VideoPlayer userId={userId} videoId={videoId} />
            ) : (
              <Navigate to="/Register" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
