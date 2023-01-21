import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function UserImage() {
  const profileData = useSelector((state) => state.appConfigReducer.profile);
  useEffect(() => {}, [profileData]);
  return (
    <img
      src={
        profileData?.avatar?.url
          ? profileData.avatar.url
          : "https://res.cloudinary.com/dazh2iyef/image/upload/v1674278708/social-media-app/sampleimages/grid_landscape_pez6bx.jpg"
      }
      alt={profileData.username + ".img"}
      draggable={false}
    />
  );
}

export default UserImage;
