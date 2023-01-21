import React from "react";
import "./ProfileDetailTab.scss";
function ProfileDetailTab(props) {
  return (
    <div className="pd-tab">
      <p className="value">{props.value}</p>
      <p className="name">{props.name}</p>
    </div>
  );
}

export default ProfileDetailTab;
