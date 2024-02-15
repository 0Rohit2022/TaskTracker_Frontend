import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import axios from "axios";

function App() {
  const { setUser, setAuthenticated, setLoading } = useContext(Context);
  useEffect(() => {
    setLoading(true);
    axios.get(`https://tasktracker-882a.onrender.com/api/v1/users/current-user`,{
      withCredentials:true
    }).then(res => {
      setUser(res.data.user);
      setAuthenticated(true);
      setLoading(false);
    }).catch((error) => {
      setUser({});
      setAuthenticated(false);
      setLoading(false);
    })
  },[])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
