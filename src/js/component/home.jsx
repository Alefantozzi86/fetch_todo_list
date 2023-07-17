import React, { useState } from "react";
import Titulo from "./titulo.jsx";
import App from "./app.jsx";

const Home = () => {
  return (
    <>
      <Titulo />
      <div className="container">
        <App />
      </div>
    </>
  );
};

export default Home;