import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addFriend } from "../../Redux/Slices/serverSlice";
import "./SuggestedUserProfile.scss";

function SuggestedUserProfile(props) {
  const userProfileRef = useRef();
  const dispatch = useDispatch();

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
          <p className="username">
            {props.user.username}&nbsp;
            <span>({props.user.gender === "M" ? "Male" : "Female"})</span>
          </p>
          <p className="follower-count">
            Followers : <span>{props.user.followers.length}</span>
          </p>
        </div>
      </div>
      <button
        className="follow-btn"
        onClick={() => {
          dispatch(addFriend({ followUserId: props.user._id }));
        }}
      >
        Follow +
      </button>
    </div>
  );
}

export default SuggestedUserProfile;
