import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import NavInfoProvider from "./context/NavInfoProvider";
import UserInfoProvider from "./context/UserInfoProvider";
import "./index.css";
import App from "./App";
import AlertProvider from "./context/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AlertProvider>
      <UserInfoProvider>
        <NavInfoProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NavInfoProvider>
      </UserInfoProvider>
    </AlertProvider>
  </React.StrictMode>
);
