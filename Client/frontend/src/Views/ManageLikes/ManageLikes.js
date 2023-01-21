import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedPosts } from "../../Redux/Slices/serverSlice";
import "./ManageLikes.scss";
function ManageLikes() {
  const dispatch = useDispatch();
  const userLikedPosts = useSelector(
    (state) => state.appConfigReducer.userLikedPosts
  );
  useEffect(() => {
    dispatch(getLikedPosts());
    // eslint-disable-next-line
  }, [userLikedPosts]);
  return (
    <div className="manage-likes">
      {typeof userLikedPosts === "string" ? <p>{userLikedPosts}</p> : "array"}
    </div>
  );
}

export default ManageLikes;
