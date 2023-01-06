import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Views/LoginPage/Login";
import SignUp from "./Views/SignUpPage/SignUp";
import LadingPage from "./Views/LandingPage/LadingPage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<App />>
          <Route path="home" element=<LadingPage /> />
          <Route path="login" element=<Login /> />
          <Route path="signup" element=<SignUp /> />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
