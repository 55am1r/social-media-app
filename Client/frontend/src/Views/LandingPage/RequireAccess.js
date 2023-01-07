import { Navigate, Outlet } from "react-router-dom";
let accessThisSite = false;
function RequireAccess() {
  return accessThisSite ? <Outlet /> : <Navigate to={'/login'}/>;
}

export default RequireAccess;
export const checkNavigate = (state) => {
  accessThisSite = state;
};
