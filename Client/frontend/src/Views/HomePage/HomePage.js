import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteSpinLoader from "../../Components/InfiniteSpinLoader/InfiniteSpinLoader";
import "./HomePage.scss";
function HomePage() {
  const isLoading = useSelector((state) => state.user.isLoading);
  useEffect(() => {}, [isLoading]);
  return (
    <div className="home">
      {isLoading ? <InfiniteSpinLoader /> : ""}
      <p>Home</p>
    </div>
  );
}

export default HomePage;
