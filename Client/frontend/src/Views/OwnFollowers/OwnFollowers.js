import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteSpinLoader from "../../Components/InfiniteSpinLoader/InfiniteSpinLoader";
import { getUserFollowers } from "../../Redux/Slices/serverSlice";
import "./OwnFollowers.scss";
function OwnFollowers() {
  const dispatch = useDispatch();
  const userFollowers = useSelector((state) => state.user.userFollowers);
  const isLoading = useSelector((state) => state.user.isLoading);
  useEffect(() => {
    dispatch(getUserFollowers());
  }, [dispatch]);
  return (
    <div className="followers">
      {isLoading ? (
        <InfiniteSpinLoader />
      ) : typeof userFollowers === "string" ? (
        <p>{userFollowers}</p>
      ) : (
        userFollowers
      )}
    </div>
  );
}

export default OwnFollowers;
