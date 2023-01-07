import React, { useCallback, useEffect } from "react";
import "./LandingPage.scss";
import { AxiosClient } from "../../Utilities/AxiosClient";
import { checkNavigate } from "./RequireAccess";
import { useNavigate } from "react-router-dom";
import { deleteAccessKey } from "../../Utilities/LocalStorageManager";
function LandingPage() {
  const navigate = useNavigate();
  const fetchData = useCallback(async () => {
    const result = await AxiosClient.get("/posts/all");
    console.log(result);
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="home">
      Home
      <button
        onClick={(e) => {
          deleteAccessKey();
          checkNavigate(false);
          navigate("/login");
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default LandingPage;
