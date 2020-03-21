import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

export default function ListTodo() {
  const [todos, setTodos] = useState([]);

  // delete function
  async function deleteTodo(id) {
    try {
      const deletetodo = await fetch(`${process.env.REACT_APP_SERVER}${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  async function getTodos() {
    try {
      const response = await fetch(process.env.REACT_APP_SERVER);
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
