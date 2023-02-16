import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrUserInfo } from "../Redux/Slices/serverSlice";
import {
  setRequirePageError,
  setRequirePageSuccess,
} from "../Redux/Slices/userSlice";
function RequireAccess() {
  const loginstatus = useSelector(
    (state) => state.appConfigReducer.loginstatus
  );
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profileReducer.profile);
  const location = useLocation();
  useEffect(() => {
    if (loginstatus) {
      dispatch(setRequirePageError(""));
      dispatch(setRequirePageSuccess(""));
      dispatch(getCurrUserInfo());
    }
    // eslint-disable-next-line
  }, [loginstatus]);

  useEffect(() => {}, [userProfile]);
  useEffect(() => {
    if (
      ["/", "signup"].some((item) => {
        return item !== location.pathname;
      })
    ) {
      document.body.style.backgroundColor = "#F1F8FF";
    }
  }, [location]);
  return (
    <>
      <Navbar />
      {loginstatus ? <Outlet /> : <Navigate to={"/"} />}
    </>
  );
}

export default RequireAccess;
