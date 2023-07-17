import React, { useState, useEffect } from "react";


const App = () => {
  const [listaTareas, setListaTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  useEffect(() => {
    
    fetch("http://assets.breatheco.de/apis/fake/todos/user/AlessandraF")
    .then((resp) => {
      if (resp.status === 400) {
        fetch("http://assets.breatheco.de/apis/fake/todos/user/AlessandraF", {
          method: "PUT",
          body: JSON.stringify([]),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(resp => {
          console.log(resp.ok); 
          console.log(resp.status); 
          console.log(resp.text());
          return resp.json(); 
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
              setListaTareas(data);
              
            });
        } else {
          return resp.json();
        }
      })
      .then((data) => setListaTareas(data));
      

    }, []);
    const newToDoItem = {
      id:Date.now(),
      task: listaTareas,
      label: listaTareas,
      done:false,
    }

  const actualizarListaTraeas = (e) => {
    if (e.key === "Enter") {
      fetch("http://assets.breatheco.de/apis/fake/todos/user/AlessandraF", {
        method: "POST",
        body: JSON.stringify([...listaTareas, { label: tarea, done: false }]),
          headers: {
            "Content-Type": "application/json",
          },
      })
        .then((resp) => {
          if (resp.status === 200) {
            fetch("http://assets.breatheco.de/apis/fake/todos/user/AlessandraF")
              .then((res) => resp.json())
              .then((data) => setListaTareas(data));
          }
        })
        .then((data) => {
          console.log(data);
        });
    }
    setListaTareas(listaTareas.concat([tarea]));
  };
 
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
  return (
    <>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setListaTareas(listaTareas.concat([tarea]));
                setTarea("");
              }
            }}
            onKeyDown={() => actualizarListaTraeas()}
            placeholder="What needs to be done?"
          />
        </li>
        {listaTareas?.map((unaTarea) => (
          <li>{unaTarea}
            <i
              className="fas fa-trash-alt papelera"
              onClick={()=> {
                setListaTareas(listaTareas.filter((tarea) => tarea !== unaTarea));
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
