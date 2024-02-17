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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-semibold mb-4">{user?.name}</h1>
        <p className="text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
