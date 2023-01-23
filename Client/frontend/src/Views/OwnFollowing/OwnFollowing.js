import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteSpinLoader from "../../Components/InfiniteSpinLoader/InfiniteSpinLoader";
import { getUserFollowings } from "../../Redux/Slices/serverSlice";
import "./OwnFollowing.scss";
function OwnFollowing() {
  const dispatch = useDispatch();
  const userFollowings = useSelector((state) => state.user.userFollowings);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    dispatch(getUserFollowings());
    // eslint-disable-next-line
  }, []);
  return (
    <div className="followings">
      {isLoading ? (
        <InfiniteSpinLoader />
      ) : typeof userFollowings === "string" ? (
        <p>{userFollowings}</p>
      ) : (
        "array"
      )}
    </div>
  );
}

export default OwnFollowing;
