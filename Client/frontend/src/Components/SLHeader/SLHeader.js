import React from "react";
import "./SLHeader.scss";
function SLHeader() {
  return (
    <div className="header">
      <h1 style={{ userSelect: "none" }}>
        {" "}
        <img
          draggable={false}
          src="https://static.vecteezy.com/system/resources/previews/010/063/436/original/instagram-app-icon-3d-render-free-png.png"
          alt="logo.img"
        />
        Ditto-Gram
      </h1>
    </div>
  );
}

export default SLHeader;
