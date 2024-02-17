import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { Context } from "../main";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { isAuthenticated, setAuthenticated, loading , setLoading } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await axios.post(
        `https://tasktracker-882a.onrender.com/api/v1/users/register`,
        {
          name,
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
      toast.error("Some error Occurred.. Please try again");
      setAuthenticated(false);
      setLoading(false);
    }
  };

  if(isAuthenticated) return <Navigate to={"/"} /> 
  return (
    <div className="login flex justify-center items-center h-screen bg-gray-100">
      <section className="w-full max-w-sm">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
            required
            className="block w-full mb-4 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
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
            SignUp
          </button>
          <h4 className="mt-4 text-center font-bold">OR</h4>
          <Link
            to="/login"
            className="block text-center mt-2 text-blue-500 hover:text-blue-700"
          >
            Log In
          </Link>
        </form>
      </section>
    </div>
  );
}

export default Register;
