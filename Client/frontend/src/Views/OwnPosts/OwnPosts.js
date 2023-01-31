import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteSpinLoader from "../../Components/InfiniteSpinLoader/InfiniteSpinLoader";
import { getOwnPosts } from "../../Redux/Slices/serverSlice";
import "./OwnPosts.scss";
function OwnPosts() {
  const dispatch = useDispatch();
  const currUserPosts = useSelector((state) => state.user.currUserPosts);
  const isLoading = useSelector((state) => state.user.isLoading);
  useEffect(() => {
    dispatch(getOwnPosts());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
  }, [currUserPosts]);
  return (
    <div className="posts">
      {isLoading ? (
        <InfiniteSpinLoader />
      ) : typeof currUserPosts === "string" ? (
        <p>{currUserPosts}</p>
      ) : (
        "array"
      )}
    </div>
  );
}

export default OwnPosts;
