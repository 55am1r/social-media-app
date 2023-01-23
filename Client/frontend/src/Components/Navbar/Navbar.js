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
import { resetInitialStateAppConfig } from "../../Redux/Slices/appConfigSlice";
import UserImage from "../UserImage/UserImage";
import { resetInitialStateUser } from "../../Redux/Slices/userSlice";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastLoginRef = useRef();
  const location = useLocation();
  const searchInputRef = useRef();
  const searchLabelRef = useRef();
  const searchSectionRef = useRef();
  const ulRef = useRef();
  const profileData = useSelector((state) => state.user.profile);

  function dispatchReset() {
    dispatch(resetInitialStateAppConfig());
    dispatch(resetInitialStateUser());
  }
  function deleteLocalStorageKeys() {
    deleteAccessKey(ACCESS_KEY);
    deleteAccessKey(ACTIVE_BTN);
  }
  useEffect(() => {}, [profileData]);
  useEffect(() => {
    if (location.pathname === "/home") {
      lastLoginRef.current.style.display = "block";
      searchSectionRef.current.style.display = "block";
      ulRef.current.style.bottom = "-210%";
    } else {
      lastLoginRef.current.style.display = "none";
      searchSectionRef.current.style.display = "none";
      ulRef.current.style.bottom = "-270%";
    }
  }, [location]);
  return (
    <div className="navbar">
      <div className="left-section">
        <div
          className="logo"
          onClick={() => {
            navigate("/home");
          }}
        >
          <SLHeader />
        </div>
      </div>

      <div className="right-section">
        <div className="search-section" ref={searchSectionRef}>
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => {
              searchInputRef.current.focus();
            }}
            ref={searchLabelRef}
          ></i>
          <input
            type="text"
            ref={searchInputRef}
            onFocus={() => {
              searchLabelRef.current.classList.add("i-width");
            }}
            onBlur={(e) => {
              e.target.value = "";
              searchLabelRef.current.classList.remove("i-width");
            }}
          />
        </div>
        <UserImage />
        <ul className="ul-list" ref={ulRef}>
          {location.pathname !== "/home" ? (
            <li>
              <button
                onClick={() => {
                  navigate("home");
                }}
              >
                Home
              </button>
            </li>
          ) : (
            ""
          )}
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
                dispatchReset();
                deleteLocalStorageKeys();
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
