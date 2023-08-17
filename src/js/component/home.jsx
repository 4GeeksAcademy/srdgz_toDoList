import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState({ label: "", done: false });
  const [todos, setTodos] = useState([]);
  const URL = "https://playground.4geeks.com/apis/fake/todos/user/srdgz";

  /*
	useEffect(() => {
		fetch(`${URL}`, {
			method: "POST",
			mode: "cors",
			redirect: "follow",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		}) 
		.then((res) => res.json())
		.then((res) => setTodos(res))
		.catch(err => console.log(err));
	}, []);

	useEffect(() => {
		fetch(`${URL}`)
    	.then((res) => {
        	if (!res.ok) {
            throw Error(res.status);
        	}
       		return res.json();
    	})
		.then((res) => setTodos(res))
		.catch(err => console.log(err));
	}, []);

	useEffect(() => {
		if (!todos.length) return;
		fetch(`${URL}`, {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(() => console.log("Everything is ok"))
		.catch(() => console.log("Something went wrong"));
	  }, [todos]);

*/

  const deleteAllUser = () => {
    fetch(`${URL}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    setTodos([]);
    setTimeout(() => {
      alert("All tasks were successfully deleted");
    }, "500").catch((error) =>
      console.error("Something went wrong. Error: ", error)
    );
  };

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
            onKeyUp={(task) => {
              if (task.key === "Enter") {
                if (inputValue.label.trim() === "") {
                  alert("The field cannot be empty");
                  return;
                } else if (
                  todos.find(
                    (elem) => elem.label.trim() === inputValue.label.trim()
                  )
                ) {
                  alert("The field cannot be duplicated");
                  return;
                }
                const updatedTodoList = [...todos, inputValue];
                setTodos(updatedTodoList);
                setInputValue({ label: "", done: false });
              }
            }}
          ></input>
        </li>
        {todos.map((task, index) => (
          <li key={index}>
            {task.label}
            {""}
            <i
              className="fa-regular fa-circle-xmark"
              onClick={() =>
                setTodos(
                  todos.filter((i, currentIndex) => index != currentIndex)
                )
              }
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
