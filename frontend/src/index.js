import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import NavInfoProvider from "./context/NavInfoProvider";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavInfoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NavInfoProvider>
  </React.StrictMode>
);
