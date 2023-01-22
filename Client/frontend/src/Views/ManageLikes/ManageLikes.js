import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteSpinLoader from "../../Components/InfiniteSpinLoader/InfiniteSpinLoader";
import { getLikedPosts } from "../../Redux/Slices/serverSlice";
import "./ManageLikes.scss";
function ManageLikes() {
  const dispatch = useDispatch();
  const userLikedPosts = useSelector(
    (state) => state.appConfigReducer.userLikedPosts
  );
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);

  useEffect(() => {
    dispatch(getLikedPosts());
    // eslint-disable-next-line
  }, [userLikedPosts]);
  return (
    <div className="manage-likes">
      {isLoading ? (
        <InfiniteSpinLoader />
      ) : typeof userLikedPosts === "string" ? (
        <p>{userLikedPosts}</p>
      ) : (
        "array"
      )}
    </div>
  );
}

export default ManageLikes;
