import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { setLoading } from "../../Redux/Slices/appConfigSlice";
import "./LandingPage.scss";
function LandingPage() {
  const loadingRef = useRef();
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const dispatch = useDispatch();

  const toggleLoadingBar = () => {
    if (isLoading) {
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(true));
    }
  };
  useEffect(() => {
    if (isLoading) {
      loadingRef.current.continuousStart();
    } else {
      loadingRef.current.complete();
    }
  }, [isLoading]);

  return (
    <div className="landing-page">
      <LoadingBar
        height={4}
        color="#68AE46"
        transitionTime={1000}
        ref={loadingRef}
      />
      <div className="links">
        <Link to={"signup"}>
          <button onClick={toggleLoadingBar}>Sign Up</button>
        </Link>
        <Link to={"login"}>
          <button onClick={toggleLoadingBar}>Login</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default LandingPage;
