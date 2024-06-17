import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    try {
      await axios.post("http://localhost:8080/auth/register", {
        username,
        password,
      });
      alert("Registration successful");
    } catch (error) {
      alert("Registration fail");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 ">
      <div className=" bg-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl text-white font-bold text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-900"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-red-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
