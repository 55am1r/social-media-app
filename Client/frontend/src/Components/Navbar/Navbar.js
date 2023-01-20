import React from "react";
import { useNavigate } from "react-router-dom";
import SLHeader from "../SLHeader/SLHeader";
import {
  ACCESS_KEY,
  deleteAccessKey,
} from "../../Utilities/LocalStorageManager";
import "./Navbar.scss";
import { useSelector } from "react-redux";
function Navbar() {
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.appConfigReducer.profile);
  return (
    <div className="navbar">
      <SLHeader />
      <div className="right-section">
        <img
          src={
            profileData?.avatar?.url
              ? profileData.avatar.url
              : "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
          }
          alt=""
        />
        <ul className="ul-list">
          <li>
            <button className="btn-btm-padding" onClick={() => {
              navigate('/myprofile')
            }}>My Account</button>
          </li>
          <li>
            <button>Settings</button>
          </li>
          <li>
            <button
              className="btn-btm-padding"
              onClick={() => {
                deleteAccessKey(ACCESS_KEY);
                navigate("/");
              }}
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
