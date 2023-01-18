import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_KEY, getAccessKey } from "../Utilities/LocalStorageManager";

function RequireAccess() {
  const accessPage = getAccessKey(ACCESS_KEY) ? true : false;
  return accessPage ? <Outlet /> : <Navigate to={"/"} />;
}

export default RequireAccess;
