import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../main";
import toast from "react-hot-toast";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { isAuthenticated, setAuthenticated, loading, setLoading } =
    useContext(Context);
  const submitHandler = async (e) => {
    e.preventDefault();
   setLoading(true);

    try {
      const { data } = await axios.post(
        `https://tasktracker-882a.onrender.com/api/v1/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setAuthenticated(true);
       setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
       setLoading(false);
      setAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  

  return (
    <div className="login flex justify-center items-center h-screen bg-gray-100">
      <section className="w-full max-w-sm">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded px-8 pt-5 pb-8 mb-5"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full mb-4 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full mb-4 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <h4 className="mt-4 text-center font-bold">OR</h4>
          <Link
            to="/register"
            className="block text-center mt-2 text-blue-500 hover:text-blue-700"
          >
            Sign Up
          </Link>
        </form>
      </section>
    </div>
  );
}

export default Login;
