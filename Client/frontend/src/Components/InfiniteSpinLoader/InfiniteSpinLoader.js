import React from "react";
import "./InfiniteSpinLoader.scss";
import { InfinitySpin } from "react-loader-spinner";
function InfiniteSpinLoader(props) {
  return (
    <div className="spin-loader"> 
      <div className="infinite-loading" style={{marginRight:props.setToCenter}}>
        <InfinitySpin color="#7D80C7" width={props.width} />
      </div>
      {props.message ? <p className="loader-message">{props.message}</p> : ""}
    </div>
  );
}

export default InfiniteSpinLoader;
