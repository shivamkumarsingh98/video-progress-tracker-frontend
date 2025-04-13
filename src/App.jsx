import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import VideoPlayer from "./components/VideoPlayer";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  const videoId = "video-01";
  const userId = localStorage.getItem("userId");

  return (
    <Router>
      <Routes>
        {/* Home route opens Register page */}
        <Route path="/" element={<Register />} />
        {/* Auth routes */}
        <Route path="/Login" element={<Login />} />

        {/* Protected video player route */}
        <Route
          path="/VideoPlayer"
          element={
            <ProtectedRoute>
              <VideoPlayer userId={userId} videoId={videoId} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
