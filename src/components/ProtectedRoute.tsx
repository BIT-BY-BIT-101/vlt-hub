import React, { useContext } from "react";
import { Route, Redirect, RouteProps, useHistory } from "react-router-dom";

import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { IonLoading } from "@ionic/react";
import Unauthorized from "../pages/error_pages/Unauthorized";
import { AuthContext } from "../context/AuthContext";
import Loader from "./loaders/Loader";

interface ProtectedRouteProps extends RouteProps {
  allowedRoles: "host" | "participant" | "venue" | "manager";
  redirected: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirected,
  ...routeProps
}) => {
  const { currentUser, loading } = useContext(AuthContext);
  const { user, userData } = useFirebaseAuth();
  const userEmail = localStorage.getItem("session");
  // const { userData } = useFirestore(`profiles`);
  const history = useHistory();

  if (loading) {
    // return <IonLoading isOpen={loading} message={"Please wait"} />;
    return <Loader />;
  }

  if (!currentUser) {
    return <Redirect to={redirected} />;
  }

  // Check if the user's role is allowed to access the route
  if (!allowedRoles.includes(currentUser?.data.role)) {
    console.log(currentUser.data?.role);
    // return <Redirect to="/unauthorized" />;
    // signOut();
    return <Unauthorized />;
  }

  return <Route {...routeProps} />;
};

export default ProtectedRoute;
