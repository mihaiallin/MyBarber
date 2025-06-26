import { Navigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated() ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
