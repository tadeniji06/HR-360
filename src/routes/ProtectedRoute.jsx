// components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import LoadingScreen from "../components/LoadingScreen";
import { logo } from "../assets";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show enhanced loading screen while checking authentication
    return <LoadingScreen appName='HR 360' logo={logo} />;
  }

  if (!isAuthenticated) {
    // Redirect to login with the attempted location
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
