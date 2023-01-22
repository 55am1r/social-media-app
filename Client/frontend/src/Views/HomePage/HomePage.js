import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteSpinLoader from "../../Components/InfiniteSpinLoader/InfiniteSpinLoader";
import "./HomePage.scss";
function HomePage() {
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  useEffect(() => {}, [isLoading]);
  return (
    <>
      {isLoading ? (
        <InfiniteSpinLoader />
      ) : (
        <div className="home">
          Home
        </div>
      )}
    </>
  );
}

export default HomePage;
