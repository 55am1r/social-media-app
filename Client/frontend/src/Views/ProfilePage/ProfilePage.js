import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ProfileDetailTab from "../../Components/ProfileDetailTab/ProfileDetailTab";
import UserImage from "../../Components/UserImage/UserImage";
import { getCurrUserInfo, getUserInfo } from "../../Redux/Slices/serverSlice";
import { resetUserProfile } from "../../Redux/Slices/UserSlices/GetUserProfile";
import {
  ACTIVE_BTN,
  getAccessKey,
  setAccessKey,
} from "../../Utilities/LocalStorageManager";
import "./MyProfile.scss";
function MyProfile() {
  const postLabelRef = useRef();
  const followersLabelRef = useRef();
  const followingLabelRef = useRef();
  const likedPostLabelRef = useRef();

  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.profileReducer.isLoading);
  const currUserProfileData = useSelector(
    (state) => state.profileReducer.profile
  );
  const userProfileData = useSelector(
    (state) => state.userProfileReducer.userprofile
  );
  function handleOnClickLabel(label) {
    [
      postLabelRef,
      followersLabelRef,
      followingLabelRef,
      likedPostLabelRef,
    ].forEach((item) => {
      if (item.current === label.current) {
        setAccessKey(ACTIVE_BTN, label.current.id);
        label.current.classList.add("button-active");
      } else {
        item.current.classList.remove("button-active");
      }
    });
  }
  useEffect(() => {
    dispatch(getCurrUserInfo());
    if (params.user_id) {
      dispatch(getUserInfo({ user_id: params.user_id }));
    } else {
      dispatch(resetUserProfile());
    }
    if (getAccessKey(ACTIVE_BTN)) {
      const activeButton = document.getElementById(getAccessKey(ACTIVE_BTN));
      activeButton.classList.add("button-active");
      navigate(getAccessKey(ACTIVE_BTN));
    } else {
      setAccessKey(ACTIVE_BTN, postLabelRef.current.id);
      postLabelRef.current.classList.add("button-active");
      navigate(getAccessKey(ACTIVE_BTN));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    userProfileData._id
      ? setUserData(userProfileData)
      : setUserData(currUserProfileData);
  }, [currUserProfileData, isLoading, userProfileData]);

  useEffect(() => {}, [userData]);

  return (
    <div className="profile-page">
      <div className="upper-div">
        <UserImage />
        <div className="details">
          <div className="name">
            <p className="username">
              You(<span>{userData?.username}</span>)
            </p>
            <p className="email">{userData?.email}</p>
          </div>
          <div className="profile-details">
            <ProfileDetailTab name="Post" value={userData.posts?.length} />
            <ProfileDetailTab
              name="Following"
              value={userData.following?.length}
            />
            <ProfileDetailTab
              name="Followers"
              value={userData.followers?.length}
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
