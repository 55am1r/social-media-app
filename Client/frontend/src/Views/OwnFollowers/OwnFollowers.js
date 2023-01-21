import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowers } from "../../Redux/Slices/serverSlice";
import "./OwnFollowers.scss";
function OwnFollowers() {
  const dispatch = useDispatch();
  const userFollowers = useSelector(
    (state) => state.appConfigReducer.userFollowers
  );
  useEffect(() => {
    dispatch(getUserFollowers());
    // eslint-disable-next-line
  }, [userFollowers]);
  return (
    <div className="followers">
      {typeof userFollowers === "string" ? (
        <p>{userFollowers}</p>
      ) : (
        userFollowers
      )}
    </div>
  );
}

export default OwnFollowers;
