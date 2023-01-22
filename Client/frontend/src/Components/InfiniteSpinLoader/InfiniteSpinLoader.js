import React from "react";
import "./InfiniteSpinLoader.scss";
import { InfinitySpin } from "react-loader-spinner";
function InfiniteSpinLoader() {
  return (
    <div className="spin-loader">
      <InfinitySpin color="#7D80C7" width={200} />
    </div>
  );
}

export default InfiniteSpinLoader;
