import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "../pages/Test";

import ProtectedRoute from "../components/ProtectedRoute";

import ParticipantSigninPage from "../pages/auth/participants/ParticipantSigninPage";
import ParticipantSignupPage from "../pages/auth/participants/ParticipantSignupPage";
import HostHomePage from "../pages/host/HostHomePage";
import ParticipantHomePage from "../pages/participant/ParticipantHomePage";
import AuthPage from "../pages/test/AuthPage";
import Test1 from "../pages/test/Test1";
import Test2 from "../pages/test/Test2";
import Test3 from "../pages/test/Test3";
import VenueHomePage from "../pages/venue/VenueHomePage";
import Test from "../pages/Test";

const TestRoutes = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Test />
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

        <Route exact path="/auth">
          <Redirect to="/auth/signin" />
        </Route>

        <Route exact path="/test">
          <Redirect to="/test/auth" />
        </Route>
        <Route exact path="/test/auth">
          <AuthPage />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
export default TestRoutes;
