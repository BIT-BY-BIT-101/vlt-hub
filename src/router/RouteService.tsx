import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route } from "react-router";
import Home from "../pages/Home";
import Signin from "../pages/auth/Signin";
import HostSigninPage from "../pages/auth/host/HostSigninPage";
import HostSignupPage from "../pages/auth/host/HostSignupPage";
import ParticipantSigninPage from "../pages/auth/participants/ParticipantSigninPage";
import ParticipantSignupPage from "../pages/auth/participants/ParticipantSignupPage";
import VenueSigninPage from "../pages/auth/venue/VenueSigninPage";
import VenueSignupPage from "../pages/auth/venue/VenueSignupPage";
import HostCreatePage from "../pages/host/HostCreatePage";
import HostEventPage from "../pages/host/HostEventPage";
import HostHistoryPage from "../pages/host/HostHistoryPage";
import HostHomePage from "../pages/host/HostHomePage";
import ParticipantEventPage from "../pages/participant/ParticipantEventPage";
import ParticipantHistoryPage from "../pages/participant/ParticipantHistoryPage";
import ParticipantHomePage from "../pages/participant/ParticipantHomePage";
import VenueHistoryPage from "../pages/venue/VenueHistoryPage";
import VenueHomePage from "../pages/venue/VenueHomePage";
import VenueRequestsPage from "../pages/venue/VenueRequestsPage";

const RouteService = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/participant/signin">
          <ParticipantSigninPage />
        </Route>
        <Route exact path="/participant/signup">
          <ParticipantSignupPage />
        </Route>
        <Route exact path="/host/signup">
          <HostSignupPage />
        </Route>
        <Route exact path="/host/signin">
          <HostSigninPage />
        </Route>
        <Route exact path="/venue/signin">
          <VenueSigninPage />
        </Route>
        <Route exact path="/venue/signup">
          <VenueSignupPage />
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
        <Route exact path="/participant/history">
          <ParticipantHistoryPage />
        </Route>
        <Route exact path="/participant/event">
          <ParticipantEventPage />
        </Route>

        {/* Host Routes */}
        <Route exact path="/host">
          <Redirect to="/hosts/home" />
        </Route>
        <Route exact path="/host/home">
          <HostHomePage />
        </Route>
        <Route exact path="/host/create">
          <HostCreatePage />
        </Route>
        <Route exact path="/host/event">
          <HostEventPage />
        </Route>
        <Route exact path="/host/history">
          <HostHistoryPage />
        </Route>

        {/* Venue Routes */}
        <Route exact path="/venue">
          <Redirect to="/venue/home" />
        </Route>
        <Route exact path="/venue/home">
          <VenueHomePage />
        </Route>
        <Route exact path="/venue/requests">
          <VenueRequestsPage />
        </Route>
        <Route exact path="/venue/history">
          <VenueHistoryPage />
        </Route>

        <Route exact path="/auth">
          <Redirect to="/auth/signin" />
        </Route>
        <Route exact path="/auth/signin">
          <Signin />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
export default RouteService;
