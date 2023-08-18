import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState({ label: "", done: false });
  const [todos, setTodos] = useState([]);
  const updatedTodoList = [...todos, inputValue];
  const URL = "https://playground.4geeks.com/apis/fake/todos/user/srdgz";

  const getTask = () => {
    fetch(`${URL}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          let data = response.json();
          setTodos(data);
        } else {
          newUser();
        }
      })
      .catch((error) => console.log("Something went wrong: \n", error));
  };

  const newUser = () => {
    fetch(`${URL}`, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) getTask();
      })
      .catch((error) => console.log("Something went wrong: \n", error));
  };

  const handleKey = (task) => {
    if (task.key === "Enter" && inputValue.label.trim() !== "") {
      addTask();
    }
  };

  const addTask = () => {
    if (todos.find((elem) => elem.label.trim() === inputValue.label.trim())) {
      alert("The field cannot be duplicated");
      return;
    }
    fetch(`${URL}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodoList),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status + " " + response.statusText);
        } else {
          setTodos(updatedTodoList);
          setInputValue({ label: "", done: false });
        }
      })
      .catch((error) => console.log("Something went wrong: \n", error));
  };

  const handleDelete = (index) => {
    const newList = todos.filter((i, currentIndex) => index != currentIndex);
    fetch(`${URL}`, {
      method: "PUT",
      body: JSON.stringify(newList),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status + " " + response.statusText);
        } else {
          getTask();
        }
      })
      .catch((error) => console.log("Something went wrong: \n", error));
  };

  const deleteAllUser = () => {
    fetch(`${URL}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status + " " + response.statusText);
        } else {
          setTodos([]);
          alert("All tasks were successfully deleted");
        }
      })
      .catch((error) => console.log("Something went wrong: \n", error));
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="container col-10">
      <h1 className="title">
        <i class="fa-solid fa-list-check"></i> My todo list
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
              onClick={handleDelete(index)}
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
