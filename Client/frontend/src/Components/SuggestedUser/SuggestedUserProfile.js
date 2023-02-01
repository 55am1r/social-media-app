import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFollowing } from "../../Redux/Slices/serverSlice";
import "./SuggestedUserProfile.scss";
import { FallingLines } from "react-loader-spinner";
function SuggestedUserProfile(props) {
  const userProfileRef = useRef();

  const dispatch = useDispatch();

  const isLoadingAddFriend = useSelector(
    (state) => state.addToFriendReducer.isLoading
  );
  useEffect(() => {}, [isLoadingAddFriend]);
  return (
    <div className="suggested-user-profile" ref={userProfileRef}>
      <div className="user-details">
        <img
          src={
            props.user.avatar?.url
              ? props.user.avatar?.url
              : "https://res.cloudinary.com/dazh2iyef/image/upload/v1674278708/social-media-app/sampleimages/grid_landscape_pez6bx.jpg"
          }
          alt={props.user.username + ".img"}
          loading="lazy"
        />
        <div className="more-details">
          <div className="username-div">
            <p className="username">{props.user.username}&nbsp;</p>
            <span>{props.user.gender ? props.user.gender : "ND"}</span>
          </div>
          <p className="follower-count">
            Followers : <span>{props.user.followers.length}</span>
          </p>
        </div>
      </div>
      <button
        className="follow-btn"
        onClick={() => {
          dispatch(addToFollowing({ followUserId: props.user._id }));
        }}
      >
        {isLoadingAddFriend ? (
          <FallingLines color="#7D80C7" width="30" />
        ) : (
          "  Follow +"
        )}
      </button>
    </div>
  );
}

export default SuggestedUserProfile;
