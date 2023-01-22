import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SLHeader from "../SLHeader/SLHeader";
import {
  ACCESS_KEY,
  ACTIVE_BTN,
  deleteAccessKey,
} from "../../Utilities/LocalStorageManager";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { resetInitialState } from "../../Redux/Slices/appConfigSlice";
import UserImage from "../UserImage/UserImage";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastLoginRef = useRef();
  const location = useLocation();
  const profileData = useSelector((state) => state.appConfigReducer.profile);
  useEffect(() => {}, [profileData]);
  useEffect(() => {
    if (location.pathname === "/home") {
      lastLoginRef.current.style.display = "block";
    } else {
      lastLoginRef.current.style.display = "none";
    }
  }, [location]);
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
                navigate(`myprofile`);
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
                dispatch(resetInitialState());
                deleteAccessKey(ACCESS_KEY);
                deleteAccessKey(ACTIVE_BTN);
                navigate("/");
              }}
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
      <p ref={lastLoginRef}>
        Last Login {" : " + profileData?.lastlogin?.message}
      </p>
    </div>
  );
}

export default Navbar;
