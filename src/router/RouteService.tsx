import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import Home from "../pages/Home";
import { IonRouterOutlet } from "@ionic/react";

import ParticipantSigninPage from "../pages/auth/participants/ParticipantSigninPage";
import ParticipantSignupPage from "../pages/auth/participants/ParticipantSignupPage";
import ParticipantHomePage from "../pages/participant/ParticipantHomePage";
import HostHomePage from "../pages/host/HostHomePage";
import VenueHomePage from "../pages/venue/VenueHomePage";

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

        {/* Participants Routes */}
        <Route exact path="/participant">
          <Redirect to="/participant/home" />
        </Route>
        <Route exact path="/participant/home">
          <ParticipantHomePage />
        </Route>

        {/* Host Routes */}
        <Route exact path="/host">
          <Redirect to="/hosts/home" />
        </Route>
        <Route exact path="/host/home">
          <HostHomePage />
        </Route>

        {/* Venue Routes */}
        <Route exact path="/venue">
          <Redirect to="/venue/home" />
        </Route>
        <Route exact path="/venue/home">
          <VenueHomePage />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
export default RouteService;
