// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://video-progress-tracker-backend.vercel.app/api/register", form);
      setMsg(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      navigate("/VideoPlayer");
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Name"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        {msg && <p className="mt-4 text-center text-red-500">{msg}</p>}

        <button
          type="button"
          onClick={goToLogin}
          className="w-full mt-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Go to Login
        </button>
      </form>
    </div>
  );
};

export default Register;
