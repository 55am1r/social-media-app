import React, { useEffect } from "react";
import "./HomePage.scss";
import { getUserInfo } from "../../Redux/Slices/serverSlice";
import { useDispatch } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
function HomePage() {
  const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.appConfigReducer.isLoading);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <div className="home">
     
      <Navbar />
    </div>
  );
}

export default HomePage;
