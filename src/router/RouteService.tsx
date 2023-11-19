import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import Home from "../pages/Home";
import { IonRouterOutlet } from "@ionic/react";

import ParticipantSigninPage from "../pages/auth/participants/ParticipantSigninPage";
import ParticipantSignupPage from "../pages/auth/participants/ParticipantSignupPage";

const RouteService = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/signin">
          <ParticipantSigninPage />
        </Route>
        <Route exact path="/signup">
          <ParticipantSignupPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
export default RouteService;
