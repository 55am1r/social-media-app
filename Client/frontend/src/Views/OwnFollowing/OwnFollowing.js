import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowings } from "../../Redux/Slices/serverSlice";
import "./OwnFollowing.scss";
function OwnFollowing() {
  const dispatch = useDispatch();
  const userFollowings = useSelector(
    (state) => state.appConfigReducer.userFollowings
  );
  useEffect(() => {
    dispatch(getUserFollowings());
    // eslint-disable-next-line
  }, [userFollowings]);
  return (
    <div className="followings">
      {typeof userFollowings === "string" ? <p>{userFollowings}</p> : "array"}
    </div>
  );
}

export default OwnFollowing;
