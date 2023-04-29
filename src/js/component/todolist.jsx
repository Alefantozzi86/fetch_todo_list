import React, { useState, useEffect } from "react";

const Todolist = () => {
  const urlBase = "http://assets.breatheco.de/apis/fake/todos/user";

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const httpResponse = await fetch(`${urlBase}/Ale`);
      const datos = await httpResponse.json();
      console.log(httpResponse.status);

      if (httpResponse.status == 404) {
        createTodo();
      } else {
        setTodos(datos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTodo = async () => {
    try {
      const httpResponse = await fetch(`${urlBase}/Ale`, {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const datos = await httpResponse.json();
      if (httpResponse.ok) {
        setTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addTodos = async () => {
    try {
      const httpResponse = await fetch(`${urlBase}/Ale`, {
        method: "PUT",
        body: JSON.stringify([...todos, inputValue]),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const todos = await httpResponse.json();
      if (httpResponse.ok) {
        getTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delet 1 tarea
  async function deleteTask(id) {
    let newListTodos = list.filter((item, index) => id !== index);
    try {
      let response = await fetch(`${urlBase}/Ale`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newListTodos)
      });
      if (response.ok) {
        getTodos();
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  //delet todas tareas
	const deleteAllTask = async () => {
		try {
			const httpresponse = await fetch(`${urlBase}/Ale`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			})
			if (httpresponse.ok) {
        getTodos()
			}
		} catch (error) {
      console.log(error)
		}
	}
 useEffect(() => { getTodos() }, [])
 
 return (
  <>
    <ul>
      <li>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setTodos(todos.concat([inputValue]));
              setInputValue("");
            }
          }}
          placeholder="What needs to be done?"
        ></input>
      </li>

      {todos.map((item, index) => (
        <li>
          {item}
         
          <i
            class="fas fa-trash-alt papelera"
            onClick={() =>
              setTodos(
                todos.filter((t, currentIndex) => {
                  return index !== currentIndex;
                })
              )
            }
          ></i>
       
        </li>
      ))}
    </ul>
    <ul>
      <li>
        <span className="tasks d-flex">
          {todos.length === 0
            ? "No Tasks, add a Task!"
            : todos.length === 1
            ? todos.length + " Item Left"
            : todos.length + " Item Left"}
        </span>
      </li>
    </ul>
  </>
);
};

export default Todolist;



