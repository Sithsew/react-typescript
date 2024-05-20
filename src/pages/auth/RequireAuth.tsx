import { useLocation, Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./authSlice";

const RequireAuth: React.FC = () => {
  const location = useLocation();

  // check whether user is login or note
  // navigate to login page if user havent login to the system
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
