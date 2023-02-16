import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./Views/LoginPage/Login";
import SignUp from "./Views/SignUpPage/SignUp";
import LandingPage from "./Views/LandingPage/LandingPage";
import RequireAccess from "./Views/RequireAccess";
import HomePage from "./Views/HomePage/HomePage";
import ProfilePage from "./Views/ProfilePage/ProfilePage";
import OwnPosts from "./Views/OwnPosts/OwnPosts";
import OwnFollowers from "./Views/OwnFollowers/OwnFollowers";
import OwnFollowing from "./Views/OwnFollowing/OwnFollowing";
import ManageLikes from "./Views/ManageLikes/ManageLikes";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const defaultProfileId = useSelector((state) => state.profileReducer.profile);

  useEffect(() => {}, [defaultProfileId]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element=<LandingPage />>
          <Route index path="/" element=<Login /> />
          <Route path="signup" element=<SignUp /> />
        </Route>
        <Route path="/" element=<RequireAccess />>
          <Route index path="home" element=<HomePage /> />
          <Route path={`/profile/:user_id?`} element=<ProfilePage />>
            <Route index path="posts" element=<OwnPosts /> />
            <Route path="followers" element=<OwnFollowers /> />
            <Route path="following" element=<OwnFollowing /> />
            <Route path="managelikes" element=<ManageLikes /> />
          </Route>
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
