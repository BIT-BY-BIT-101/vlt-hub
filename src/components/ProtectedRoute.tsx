import React, { useEffect, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import useFirestore from "../hooks/useFirestore";
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

  if (loading) {
    return <IonLoading isOpen={loading} message={"Please Wait"} />;
  }

  if (!user || !userData?.role) {
    console.log(userData?.role);
    console.log(user);

    return <Redirect to={redirected} />;
  }

  // Check if the user's role is allowed to access the route
  if (!allowedRoles.includes(userData?.role)) {
    console.log(user);
    // return <Redirect to="/unauthorized" />;
    // signOut();
    return <p>Unauthorized</p>;
    // return <Redirect to={redirected} />;
  }

  return <Route {...routeProps} />;
};

export default ProtectedRoute;
