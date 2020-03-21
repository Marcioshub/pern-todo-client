import React, { Fragment, useState } from "react";

export default function InputTodo() {
  const [description, setDescription] = useState("");

  async function onSubmitForm(e) {
    e.preventDefault();

    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      //console.log(response);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <h5 className="text-center mt-3">
        This application was created using the PERN stack (Postgres, Express,
        React and Nodejs)
      </h5>

      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          className="form-control form-control-lg"
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success btn-lg" type="submit">
          Add
        </button>
      </form>
    </Fragment>
  );
}
