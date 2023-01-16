import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import { getUserInfo } from "../../Redux/Slices/serverSlice";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
function HomePage() {
  const dispatch = useDispatch();
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
      />
      <Navbar />
    </div>
  );
}

export default HomePage;
