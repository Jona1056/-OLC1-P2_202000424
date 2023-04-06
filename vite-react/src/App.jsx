import React from "react";

import Home from "./Pages/Home";
import Tabla from "./Pages/Tabla";
import Arboles from "./Pages/Arboles";
import Errores from "./Pages/Errores";
import { Fragment } from "react";
import { Navbar } from "./Pages/navbar";

import { Navigate, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tabla" element={<Tabla />} />
        <Route path="/Arboles" element={<Arboles />} />
        <Route path="/Errores" element={<Errores />} />
        <Route path="/*" element={<Navigate to="/" />} />
        {/** 404 page  regresa a la pagina principal*/}
      </Routes>
    </>
  );
}

export default App;
