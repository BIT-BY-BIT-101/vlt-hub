import React, { useContext } from "react";
import { Route, Redirect, RouteProps, useHistory } from "react-router-dom";

import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { IonLoading } from "@ionic/react";
import Unauthorized from "../pages/error_pages/Unauthorized";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps extends RouteProps {
  allowedRoles: "host" | "participant" | "venue";
  redirected: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirected,
  ...routeProps
}) => {
  const { currentUser } = useContext(AuthContext);
  const { user, userData, loading } = useFirebaseAuth();
  const userEmail = localStorage.getItem("session");
  // const { userData } = useFirestore(`profiles`);
  const history = useHistory();

  if (loading) {
    // return <IonLoading isOpen={loading} message={"Please wait"} />;
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    console.log(currentUser);

    return <Redirect to={redirected} />;
    // return history.goBack();
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
