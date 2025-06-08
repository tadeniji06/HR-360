// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import LoadingScreen from "../components/LoadingScreen";
import { logo } from "../assets";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Show enhanced loading screen while checking authentication
    return <LoadingScreen appName='HR 360' logo={logo} />;
  }

  // If user is authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to='/home' replace />;
  }

  // If not authenticated, show the public route (login/register)
  return children;
};

export default PublicRoute;
