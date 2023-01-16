import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./Views/LoginPage/Login";
import SignUp from "./Views/SignUpPage/SignUp";
import LandingPage from "./Views/LandingPage/LandingPage";
import RequireAccess from "./Views/RequireAccess";
import HomePage from "./Views/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element=<LandingPage />>
          <Route index path="/" element=<Login /> />
          <Route path="signup" element=<SignUp /> />
        </Route>
        <Route path="/" element=<RequireAccess />>
          <Route path="home" element=<HomePage /> />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
