import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileDetailTab from "../../Components/ProfileDetailTab/ProfileDetailTab";
import UserImage from "../../Components/UserImage/UserImage";
import {
  getAccessKey,
  setAccessKey,
} from "../../Utilities/LocalStorageManager";
import "./MyProfile.scss";
function MyProfile() {
  const postLabelRef = useRef();
  const followersLabelRef = useRef();
  const followingLabelRef = useRef();
  const likedPostLabelRef = useRef();
  const navigate = useNavigate();

  const profileData = useSelector((state) => state.appConfigReducer.profile);

  function handleOnClickLabel(label) {
    [
      postLabelRef,
      followersLabelRef,
      followingLabelRef,
      likedPostLabelRef,
    ].forEach((item) => {
      if (item.current === label.current) {
        setAccessKey("currentActivebtn", label.current.id);
        label.current.classList.add("button-active");
      } else {
        item.current.classList.remove("button-active");
      }
    });
  }

  useEffect(() => {}, [profileData]);

  useEffect(() => {
    if (getAccessKey("currentActivebtn")) {
      const activeButton = document.getElementById(
        getAccessKey("currentActivebtn")
      );
      activeButton.classList.add("button-active");
      navigate(getAccessKey("currentActivebtn"));
    } else {
      setAccessKey("currentActivebtn", postLabelRef.current.id);
      postLabelRef.current.classList.add("button-active");
      navigate(getAccessKey("currentActivebtn"));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="profile-page">
      <div className="upper-div">
        <UserImage />
        <div className="details">
          <div className="name">
            <p className="username">
              You(<span>{profileData?.username}</span>)
            </p>
            <p className="email">{profileData?.email}</p>
          </div>
          <div className="profile-details">
            <ProfileDetailTab name="Post" value={profileData.posts?.length} />
            <ProfileDetailTab
              name="Following"
              value={profileData.following?.length}
            />
            <ProfileDetailTab
              name="Followers"
              value={profileData.following?.length}
            />
          </div>
        </div>
        <div className="buttons">
          <button>+Create Post</button>
        </div>
      </div>
      <div className="lower-div">
        <div className="headers">
          <button
            id="posts"
            ref={postLabelRef}
            onClick={() => {
              handleOnClickLabel(postLabelRef);
              navigate("posts");
            }}
          >
            Posts
          </button>
          <button
            id="following"
            ref={followingLabelRef}
            onClick={() => {
              handleOnClickLabel(followingLabelRef);
              navigate("following");
            }}
          >
            Following
          </button>
          <button
            id="followers"
            ref={followersLabelRef}
            onClick={() => {
              handleOnClickLabel(followersLabelRef);
              navigate("followers");
            }}
          >
            Followers
          </button>
          <button
            id="managelikes"
            ref={likedPostLabelRef}
            onClick={() => {
              handleOnClickLabel(likedPostLabelRef);
              navigate("managelikes");
            }}
          >
            Liked Posts
          </button>
        </div>
        <div className="outlet-box">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
