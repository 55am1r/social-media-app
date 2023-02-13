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
import {
  resetInitialStateUser,
  setRequirePageError,
  setRequirePageSuccess,
} from "../../Redux/Slices/userSlice";
import { resetSuggestedUsers } from "../../Redux/Slices/UserSlices/GetRandomUsers";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastLoginRef = useRef();
  const location = useLocation();
  const searchInputRef = useRef();
  const searchLabelRef = useRef();
  const searchSectionRef = useRef();
  const ulRef = useRef();
  const errorMsgRef = useRef();
  const successMsgRef = useRef();

  const errorMessage = useSelector((state) => state.user.requireUserPage.error);
  const successMessage = useSelector(
    (state) => state.user.requireUserPage.success
  );
  const profileData = useSelector((state) => state.profileReducer.profile);

  function dispatchReset() {
    dispatch(resetInitialStateAppConfig());
    dispatch(resetInitialStateUser());
    dispatch(resetSuggestedUsers());
  }
  function deleteLocalStorageKeys() {
    deleteAccessKey(ACCESS_KEY);
    deleteAccessKey(ACTIVE_BTN);
  }
  useEffect(() => {
    if (errorMessage) {
      errorMsgRef.current.classList.add("error-message-change");
      setTimeout(() => {
        errorMsgRef.current.classList.remove("error-message-change");
      }, 6000);
      setTimeout(() => {
        dispatch(setRequirePageError(""));
      }, 7500);
    }
    // eslint-disable-next-line
  }, [errorMessage]);
  useEffect(() => {
    if (successMessage) {
      successMsgRef.current.classList.add("success-message-change");
      setTimeout(() => {
        successMsgRef.current.classList.remove("success-message-change");
      }, 6000);
      setTimeout(() => {
        dispatch(setRequirePageSuccess(""));
      }, 7500);
    }
    // eslint-disable-next-line
  }, [successMessage]);
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
    <>
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
      <p className="error-message" ref={errorMsgRef}>
        {errorMessage}
      </p>
      <p className="success-message" ref={successMsgRef}>
        {successMessage}
      </p>
    </>
  );
}

export default Navbar;
