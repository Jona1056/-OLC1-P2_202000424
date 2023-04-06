import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";
import "./css/index.css";

const appRoot = document.getElementById("root");

createRoot(appRoot).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
