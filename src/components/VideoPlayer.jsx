import { useEffect, useRef, useState } from "react";
import axios from "axios";

const VideoPlayer = ({ userId, videoId }) => {
  const videoRef = useRef(null);
  const [intervals, setIntervals] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);
  const [lastPosition, setLastPosition] = useState(0);

  const backendURL = "http://localhost:5000/api";

  // Fetch progress when component mounts
  useEffect(() => {
    console.log("VideoPlayer mounted");
    console.log("userId:", userId);
    console.log("videoId:", videoId);

    if (!userId || !videoId) {
      console.error("Missing userId or videoId.");
      return;
    }

    const getProgress = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      try {
        const res = await axios.get(
          `${backendURL}/progress/${userId}/${videoId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data) {
          console.log(" Progress fetched:", res.data);
          setIntervals(res.data.intervals || []);
          setPercentage(res.data.percentage || 0);
          setLastPosition(res.data.lastPosition || 0);
        }
      } catch (error) {
        console.error(
          " Error fetching progress:",
          error.response?.data || error.message
        );
      }
    };

    getProgress();
  }, [userId, videoId]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedMetadata = () => {
      videoElement.currentTime = lastPosition;
    };

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [lastPosition]);

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime;
    if (startTime === null) {
      setStartTime(currentTime);
    }
  };

  const handlePause = async () => {
    const endTime = videoRef.current.currentTime;

    if (startTime !== null && endTime - startTime > 5) {
      const interval = {
        start: Math.floor(startTime),
        end: Math.floor(endTime),
      };

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      try {
        const res = await axios.post(
          `${backendURL}/progress`,
          {
            userId,
            videoId,
            videoDuration: Math.floor(videoDuration),
            newInterval: interval,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Progress saved:", res.data);
        setPercentage(res.data.percentage || 0);
        setIntervals(res.data.intervals || []);
      } catch (error) {
        console.error(
          " Error saving progress:",
          error.response?.data || error.message
        );
      }
    }

    setStartTime(null);
  };

  const goTologout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded-xl shadow">
      <video
        src="/sample.mp4.mp4"
        ref={videoRef}
        controls
        className="w-full rounded-lg"
        onTimeUpdate={handleTimeUpdate}
        onPause={handlePause}
        onLoadedMetadata={() =>
          setVideoDuration(videoRef.current?.duration || 0)
        }
      />

      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">Progress: {percentage}% watched</p>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 text-left">
        <p className="font-semibold">Watched Intervals:</p>
        <ul className="ml-4 list-disc">
          {intervals.map((intv, idx) => (
            <li key={idx}>
              {intv.start}s - {intv.end}s
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={goTologout}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default VideoPlayer;
