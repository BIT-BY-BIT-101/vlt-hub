import React, { useContext } from "react";
import { Route, Redirect, RouteProps, useHistory } from "react-router-dom";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import Unauthorized from "../pages/error_pages/Unauthorized";
import { AuthContext } from "../context/AuthContext";
import Loader from "./loaders/Loader";

interface ProtectedRouteProps extends RouteProps {
  allowedRoles: "host" | "participant" | "venue";
  redirected: string;
  requiresKYC?: boolean; // New prop to indicate if the route requires KYC
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirected,
  requiresKYC = false, // Default to false
  ...routeProps
}) => {
  const { currentUser, loading } = useContext(AuthContext);
  const { user, userData } = useFirebaseAuth();
  const history = useHistory();

  // Check if user is a host and needs KYC verification
  const isHost = currentUser?.data.role === "host";
  const isVerified = currentUser?.data.isVerified === true;
  const needsKYC = isHost && !isVerified && requiresKYC === true;

  if (loading) {
    return <Loader />;
  }

  if (!currentUser) {
    return <Redirect to={redirected} />;
  }

  // Check if the user's role is allowed to access the route
  if (!allowedRoles.includes(currentUser?.data.role)) {
    return <Unauthorized />;
  }

  return <Route {...routeProps} />;
};

export default ProtectedRoute;
