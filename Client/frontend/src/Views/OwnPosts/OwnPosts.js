import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnPosts } from "../../Redux/Slices/serverSlice";
import "./OwnPosts.scss";
function OwnPosts() {
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => state.appConfigReducer.userPosts);
  useEffect(() => {
    dispatch(getOwnPosts());
    // eslint-disable-next-line
  }, []);
  return (
    <div className="posts">
      {typeof userPosts === "string" ? <p>{userPosts}</p> : "array"}
    </div>
  );
}

export default OwnPosts;
