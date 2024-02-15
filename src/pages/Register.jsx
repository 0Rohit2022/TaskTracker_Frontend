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

   
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">SignUp</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  );
}

export default Register;
