import React from "react";
import "./InfiniteSpinLoader.scss";
import { InfinitySpin } from "react-loader-spinner";
function InfiniteSpinLoader(props) {
  return (
    <div className="spin-loader">
      <InfinitySpin color="#7D80C7" width={props.width} />
    </div>
  );
}

export default InfiniteSpinLoader;
