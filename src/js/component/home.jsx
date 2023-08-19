import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [inputValue, setInputValue] = useState({ label: "", done: false });
  const [todos, setTodos] = useState([]);
  const updatedTodoList = [...todos, inputValue];
  const URL =
    "https://todo-list-ea179-default-rtdb.europe-west1.firebasedatabase.app/srdgz.json";

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${URL}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data == null) {
          newUser();
        } else {
          setTodos(data);
        }
      } else {
        newUser();
      }
    } catch (error) {
      console.log("Something went wrong:\n", error);
    }
  };

  const newUser = async () => {
    try {
      const response = await fetch(`${URL}`, {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (error) {
      console.log("Something went wrong:\n", error);
    }
  };

  const handleKey = (task) => {
    if (task.key === "Enter" && inputValue.label.trim() !== "") {
      addTask();
    }
  };

  const addTask = async () => {
    if (todos.find((elem) => elem.label.trim() === inputValue.label.trim())) {
      toast.error("The field cannot be duplicated");
      return;
    }
    try {
      const response = await fetch(`${URL}`, {
        method: "PUT",
        body: JSON.stringify(updatedTodoList),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setTodos(updatedTodoList);
        setInputValue({ label: "", done: false });
      } else {
        throw new Error(response.status + " " + response.statusText);
      }
    } catch (error) {
      console.log("Something went wrong:\n", error);
    }
  };

  const handleDelete = async (index) => {
    const newList = todos.filter((_, currentIndex) => index !== currentIndex);
    try {
      const response = await fetch(`${URL}`, {
        method: "PUT",
        body: JSON.stringify(newList),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        await fetchTasks();
      } else {
        throw new Error(response.status + " " + response.statusText);
      }
    } catch (error) {
      console.log("Something went wrong:\n", error);
    }
  };

  const deleteAllUser = async () => {
    try {
      const response = await fetch(`${URL}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        setTodos([]);
        toast.success("All tasks were successfully deleted");
      } else {
        throw new Error(response.status + " " + response.statusText);
      }
    } catch (error) {
      console.log("Something went wrong:\n", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container col-10">
      <h1 className="title">
        <i className="fa-solid fa-list-check"></i> My todo list
      </h1>
      <ul>
        <li>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your task"
            value={inputValue.label}
            onChange={(task) =>
              setInputValue({ ...inputValue, label: task.target.value })
            }
            onKeyUp={handleKey}
          ></input>
        </li>

        {todos.map((task, index) => (
          <li key={index}>
            {task.label}
            {""}
            <i
              className="fa-regular fa-circle-xmark"
              onClick={() => handleDelete(index)}
            ></i>
            <hr className="breakLine" />
          </li>
        ))}
      </ul>
      <button
        className={`btn btn-danger float-start mx-auto ${
          todos.length === 0 && "disabled"
        }`}
        id="deleteAll"
        onClick={deleteAllUser}
      >
        Delete All
      </button>
      <h6>You have {todos.length} pending tasks</h6>
    </div>
  );
};

export default Home;
