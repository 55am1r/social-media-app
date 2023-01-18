import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import {
  setLandingPageError,
  setLandingPageSuccess,
} from "../../Redux/Slices/appConfigSlice";
import "./LandingPage.scss";
function LandingPage() {
  const errorDivRef = useRef();
  const successDivRef = useRef();
  const dispatch = useDispatch();

  const errorMsg = useSelector(
    (state) => state.appConfigReducer.landingPage.error
  );
  const succesMsg = useSelector(
    (state) => state.appConfigReducer.landingPage.success
  );
  useEffect(() => {
    if (errorMsg) {
      errorDivRef.current.classList.add("change-on");
      setTimeout(() => {
        errorDivRef.current.classList.remove("change-on");
        dispatch(setLandingPageError(""));
      }, 5000);
    }
    if (succesMsg) {
      successDivRef.current.classList.add("change-on");
      setTimeout(() => {
        successDivRef.current.classList.remove("change-on");
        dispatch(setLandingPageSuccess(""));
      }, 5000);
    }
    // eslint-disable-next-line
  }, [errorMsg, succesMsg]);

  return (
    <div className="landing-page">
      <div className="error-msg" ref={errorDivRef}>
        <p className="msg">{errorMsg}</p>
        <i
          className="fa-regular fa-circle-xmark"
          onClick={() => {
            errorDivRef.current.classList.remove("change-on");
          }}
        ></i>
      </div>
      <div className="success-msg" ref={successDivRef}>
        <p className="msg">{succesMsg}</p>
        <i
          className="fa-regular fa-octagon-xmark"
          onClick={() => {
            successDivRef.current.classList.remove("change-on");
          }}
        ></i>
      </div>
      <Outlet />
      <div className="info">
        <div className="links">
          <ul>
            <li>
              <a
                href="https://help.instagram.com/581066165581870/?locale=en_US"
                target={"_blank"}
                rel="noreferrer"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/privacy/policy"
                target={"_blank"}
                rel="noreferrer"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://help.instagram.com/1896641480634370/"
                target={"_blank"}
                rel="noreferrer"
              >
                Cookies Policy
              </a>
            </li>
          </ul>
        </div>
        <p className="agreement">© 2023 Ditto-Gram By Shaik Sameer</p>
      </div>
    </div>
  );
}

export default LandingPage;
