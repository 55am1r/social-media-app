import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_KEY, getAccessKey } from "../Utilities/LocalStorageManager";
import Navbar from "../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "../Redux/Slices/serverSlice";
function RequireAccess() {
  const accessPage = getAccessKey(ACCESS_KEY) ? true : false;
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.appConfigReducer.profile);
  useEffect(() => {
    if (accessPage) {
      dispatch(getUserInfo());
    }
    // eslint-disable-next-line
  }, [accessPage]);
  useEffect(() => {}, [userProfile]);
  return (
    <>
      <Navbar />
      {accessPage ? <Outlet /> : <Navigate to={"/"} />}
    </>
  );
}

export default RequireAccess;
