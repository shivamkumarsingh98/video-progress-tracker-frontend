import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const { Login } = useAuth();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/");
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://video-progress-tracker-backend.vercel.app/api/login",
        form
      );

      if (res.data.token || res.data.userId) {
        // Save the token to localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        Login({
          token: localStorage.getItem("token") || res.data.token,
          userId: localStorage.getItem("userId") || res.data.userId,
        });

        setMsg("Login successful!");
        navigate("/VideoPlayer");
      } else {
        setMsg("No token received, login failed.");
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>

        {msg && <p className="mt-4 text-center text-red-500">{msg}</p>}
        <button
          type="button"
          onClick={goToLogin}
          className="w-full mt-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Go to Register
        </button>
      </form>
    </div>
  );
};

export default Login;
