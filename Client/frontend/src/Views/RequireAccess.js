import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "../Redux/Slices/serverSlice";
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
  useEffect(() => {
    if (loginstatus) {
      dispatch(setRequirePageError(""));
      dispatch(setRequirePageSuccess(""));
      dispatch(getUserInfo());
    }
    // eslint-disable-next-line
  }, [loginstatus]);
  useEffect(() => {}, [userProfile]);
  return (
    <>
      <Navbar />
      {loginstatus ? <Outlet /> : <Navigate to={"/"} />}
    </>
  );
}

export default RequireAccess;
