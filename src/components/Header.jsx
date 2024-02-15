import React, { useContext } from "react";
import { Link} from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setAuthenticated ,loading, setLoading } = useContext(Context);

   const logoutHandler = async () => {
    setLoading(true);
     try {
       await axios.get(
         `https://tasktracker-882a.onrender.com/api/v1/users/logout`,
         {
           withCredentials: true,
         }
       );

       toast.success("Logged Out Successfully");
       setAuthenticated(false);
       setLoading(false);
     } catch (error) {
       toast.error("Error!! Please try again");
       setLoading(false);
       setAuthenticated(true);
     }
   };


  

  return (
    <nav className="header">
      <div>
        <h2>TaskSecure App</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>

        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">Logout</button>
        ) : (
          <Link to={"/login"}>login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
