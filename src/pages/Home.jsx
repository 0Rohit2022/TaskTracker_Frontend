import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Context } from "../main"
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const {isAuthenticated} = useContext(Context);


    const updateHandler = async (id) => {
      try {
        const { data } = await axios.put(
          `https://tasktracker-882a.onrender.com/api/v1/task/${id}`,
          {},
          {
            withCredentials: true,
          }
        );

        toast.success(data.message);
        setRefresh((prev) => !prev);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    const deleteHandler = async (id) => {
      try {
        const { data } = await axios.delete(
          `https://tasktracker-882a.onrender.com/api/v1/task/${id}`,
          {
            withCredentials: true,
          }
        );

        toast.success(data.message);
        setRefresh((prev) => !prev);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };


   


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://tasktracker-882a.onrender.com/api/v1/task/newtask`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev)
    } catch (error) {
      toast.error("Error: Task not Added successfully");
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`https://tasktracker-882a.onrender.com/api/v1/task/mytask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTask(res.data.tasks);
        console.log(res.data.tasks);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [refresh]);

  if(!isAuthenticated) return <Navigate to={"/login"} />
  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
