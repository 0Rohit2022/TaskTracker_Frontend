import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { isAuthenticated, loading,setLoading, user, setUser } = useContext(Context);
 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://tasktracker-882a.onrender.com/api/v1/users/current-user",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated ) {
      fetchUserData();
    }
  }, [isAuthenticated,  setUser]);

  if (!isAuthenticated) return <Navigate to="/login" />;

  

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
