import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import InfoTab from "../../Components/InfoTab/InfoTab";
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
      }, 8000);
    }
    // eslint-disable-next-line
  }, [errorMsg, succesMsg]);

  return (
    <div className="landing-page">
      <div className="error-msg" ref={errorDivRef}>
        <p className="msg">{errorMsg}</p>
        <i
          className="fa-regular fa-octagon-xmark"
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
      <InfoTab />
    </div>
  );
}

export default LandingPage;
