import React from "react";
import { Outlet } from "react-router-dom";
import "./LandingPage.scss";
function LandingPage() {
  return (
    <div className="landing-page">
      <Outlet />
    </div>
  );
}

export default LandingPage;
