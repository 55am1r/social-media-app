import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_KEY, getAccessKey } from "../Utilities/LocalStorageManager";
import Navbar from "../Components/Navbar/Navbar";
function RequireAccess() {
  const accessPage = getAccessKey(ACCESS_KEY) ? true : false;
  return (
    <>
      <Navbar />
      {accessPage ? <Outlet /> : <Navigate to={"/"} />}
    </>
  );
}

export default RequireAccess;
