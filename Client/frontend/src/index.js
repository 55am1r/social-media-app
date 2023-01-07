import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Views/LoginPage/Login";
import SignUp from "./Views/SignUpPage/SignUp";
import LandingPage from "./Views/LandingPage/LandingPage";
import RequireAccess from "./Views/LandingPage/RequireAccess";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<App />>
          <Route path="login" element=<Login /> />
          <Route path="signup" element=<SignUp /> />
        </Route>
        <Route element=<RequireAccess />>
          <Route path="/home" element=<LandingPage /> />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
