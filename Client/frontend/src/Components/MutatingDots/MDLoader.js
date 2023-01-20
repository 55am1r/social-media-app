import React from "react";
import { MutatingDots } from "react-loader-spinner";
import "./MDLoader.scss";
function MDLoader(props) {
  return (
    <div className="loader">
      <MutatingDots
        height="100"
        width="100"
        color="#8387f7"
        secondaryColor="#8387f7"
        radius="12.5"
      />
      <p>{props.message}</p>
    </div>
  );
}

export default MDLoader;
