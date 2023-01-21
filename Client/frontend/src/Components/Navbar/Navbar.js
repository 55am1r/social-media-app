import React from "react";
import { useNavigate } from "react-router-dom";
import SLHeader from "../SLHeader/SLHeader";
import {
  ACCESS_KEY,
  deleteAccessKey,
} from "../../Utilities/LocalStorageManager";
import "./Navbar.scss";
import { useDispatch } from "react-redux";
import { setProfile } from "../../Redux/Slices/appConfigSlice";
import UserImage from "../UserImage/UserImage";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div
        className="logo"
        onClick={() => {
          navigate("/home");
        }}
      >
        <SLHeader />
      </div>
      <div className="right-section">
        <UserImage />
        <ul className="ul-list">
          <li>
            <button
              className="btn-btm-padding"
              onClick={() => {
                navigate("/myprofile");
              }}
            >
              My Account
            </button>
          </li>
          <li>
            <button>Settings</button>
          </li>
          <li>
            <button
              className="btn-btm-padding"
              onClick={() => {
                dispatch(setProfile({}));
                deleteAccessKey(ACCESS_KEY);
                navigate("/");
              }}
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
