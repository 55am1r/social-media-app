import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import { checkNavigate } from "../RequireAccess";
import { useNavigate } from "react-router-dom";
import { deleteAccessKey } from "../../Utilities/LocalStorageManager";
import { getUserInfo } from "../../Redux/Slices/serverSlice";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const loaderRef = useRef();
  const [progress_V, setLoaderProgress] = useState(0);

  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      const loadingTimer = setInterval(() => {
        setLoaderProgress(progress_V + 10);
        if (progress_V > 60) {
          clearInterval(loadingTimer);
        }
      }, 100);
    } else {
      setLoaderProgress(100);
    }
    // eslint-disable-next-line
  }, [isLoading]);

  return (
    <div className="home">
      <LoadingBar
        height={4}
        color="#68AE46"
        transitionTime={1000}
        progress={progress_V}
        // ref={loaderRef}
      />
      Home
      <button
        onClick={() => {
          deleteAccessKey();
          checkNavigate(false);
          navigate("/login");
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default HomePage;
