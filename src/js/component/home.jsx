import React, { useState } from "react";
import Titulo from "./titulo.jsx";
import Todolist from "./todolist.jsx";

const Home = () => {
  return (
    <>
      <Titulo />
      <div className="container">
        <Todolist />
      </div>
    </>
  );
};

export default Home;