import React from "react";
import { Route, Redirect, RouteProps, useHistory } from "react-router-dom";

import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { IonLoading } from "@ionic/react";

interface ProtectedRouteProps extends RouteProps {
  allowedRoles: "host" | "participant" | "venue";
  redirected: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirected,
  ...routeProps
}) => {
  const { user, loading, userData, signOut } = useFirebaseAuth();
  const userEmail = localStorage.getItem("session");
  // const { userData } = useFirestore(`profiles`);
  const history = useHistory();

  if (loading) {
    // return <IonLoading isOpen={loading} message={"Please wait"} />;
    return <p>Loading...</p>;
  }

  if (!user || !userData) {
    console.log(user);

    return <Redirect to={redirected} />;
    // return history.goBack();
  }

  // Check if the user's role is allowed to access the route
  if (!allowedRoles.includes(userData?.role)) {
    console.log(user);
    // return <Redirect to="/unauthorized" />;
    // signOut();
    return <p>Unauthorized</p>;
    // return <Redirect to={redirected} />;
    // if (userData?.role === "participant") {
    //   return <Redirect to="/participant/home" />;
    // }
    // if (userData?.role === "host") {
    //   return <Redirect to="/host/home" />;
    // }
    // if (userData?.role === "venue") {
    //   return <Redirect to="/venue/home" />;
    // }
  }

  return <Route {...routeProps} />;
};

export default ProtectedRoute;
