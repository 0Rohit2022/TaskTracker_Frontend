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
    <nav className="header bg-gray-800 py-4 px-6 flex justify-between items-center">
      <div>
        <h2 className="text-white text-[19px]">TaskTracker App</h2>
      </div>
      <article className="flex items-center space-x-4">
        <Link to={"/"} className="text-white text-2xl hover:text-gray-300">
          Home
        </Link>
        <Link
          to={"/profile"}
          className="text-white  text-2xl hover:text-gray-300"
        >
          Profile
        </Link>

        {isAuthenticated ? (
          <button
            disabled={loading}
            onClick={logoutHandler}
            className="btn bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            to={"/login"}
            className="text-white  text-2xl hover:text-gray-300"
          >
            Login
          </Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
