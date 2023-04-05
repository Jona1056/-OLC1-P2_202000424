import React from 'react';

import Home from './Home';
import About from './About';
import { Fragment } from 'react';

import { Navigate,Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <h1>React Router</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to ="/about">About</Link>
          </li>
        </ul>
      </nav>
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element ={<Navigate to="/"/>} />  {/** 404 page  regresa a la pagina principal*/}
   
      </Routes>
    </Fragment>
  );
}

export default App;