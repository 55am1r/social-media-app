import React from "react";
import "./SLHeader.scss";
function SLHeader() {
  return (
    <div className="header">
      <h1 style={{ userSelect: "none" }}>
        {" "}
        <img
          draggable={false}
          src="https://res.cloudinary.com/dazh2iyef/image/upload/v1674278701/social-media-app/sampleimages/grid_landscape_pswbhf.png"
          alt="logo.img"
        />
        Ditto-Gram
      </h1>
    </div>
  );
}

export default SLHeader;
