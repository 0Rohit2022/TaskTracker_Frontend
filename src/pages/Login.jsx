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
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
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
          <button  type="submit">Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
}

export default Login;
