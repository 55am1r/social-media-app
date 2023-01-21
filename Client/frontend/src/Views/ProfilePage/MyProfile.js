import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UserImage from "../../Components/UserImage/UserImage";
import "./MyProfile.scss";
function MyProfile() {
  const profileData = useSelector((state) => state.appConfigReducer.profile);
  useEffect(() => {}, [profileData]);
  return (
    <div className="profile-page">
      <div className="upper-div">
        <UserImage />
        <div className="details">
          <p className="username">
            You(<span>{profileData.username}</span>)
          </p>
          <p className="email">{profileData.email}</p>
        </div>
      </div>
      <div className="lower-div"></div>
    </div>
  );
}

export default MyProfile;
