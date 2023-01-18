import React from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_KEY, deleteAccessKey } from "../../Utilities/LocalStorageManager";
import "./Navbar.scss";
function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      Home
      <button
        onClick={() => {
          deleteAccessKey(ACCESS_KEY);
          navigate("/");
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Navbar;
