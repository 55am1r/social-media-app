import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteSpinLoader from "../../Components/InfiniteSpinLoader/InfiniteSpinLoader";
import { getOwnPosts } from "../../Redux/Slices/serverSlice";
import "./OwnPosts.scss";
function OwnPosts() {
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => state.user.userPosts);
  const isLoading = useSelector((state) => state.user.isLoading);
  useEffect(() => {
    dispatch(getOwnPosts());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
  }, [userPosts]);
  return (
    <div className="posts">
      {isLoading ? (
        <InfiniteSpinLoader />
      ) : typeof userPosts === "string" ? (
        <p>{userPosts}</p>
      ) : (
        "array"
      )}
    </div>
  );
}

export default OwnPosts;
