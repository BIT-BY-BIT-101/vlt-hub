import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Test from "../pages/Test";
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
import VenueBookedEventsPage from "../pages/venue/VenueBookedEventsPage";
import VenueHistoryPage from "../pages/venue/VenueHistoryPage";
import VenueHomePage from "../pages/venue/VenueHomePage";
import VenueRequestsPage from "../pages/venue/VenueRequestsPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { VenueProfilePage } from "../pages/venue/VenueProfilePage";

const RouteService = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
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

        <Route exact path="/home">
          <Test />
        </Route>

        <Route exact path="/">
          {/* <Redirect to="/home" /> */}
          <Redirect to="/participant/signin" />
        </Route>

        {/* Participants Routes */}

        <Route exact path="/participant">
          <Redirect to="/participant/home" />
        </Route>

        <ProtectedRoute
          path="/participant/home"
          allowedRoles={"participant"}
          component={ParticipantHomePage}
          redirected="/participant/signin"
        />
        <ProtectedRoute
          path="/participant/event"
          allowedRoles={"participant"}
          component={ParticipantEventPage}
          redirected="/participant/signin"
        />
        <ProtectedRoute
          path="/participant/history"
          allowedRoles={"participant"}
          component={ParticipantHistoryPage}
          redirected="/participant/signin"
        />

        {/* Host Routes */}
        <Route exact path="/host">
          <Redirect to="/hosts/home" />
        </Route>
        <ProtectedRoute
          path="/host/home"
          allowedRoles={"host"}
          component={HostHomePage}
          redirected="/host/signin"
        />
        <ProtectedRoute
          path="/host/create"
          allowedRoles={"host"}
          component={HostCreatePage}
          redirected="/host/signin"
        />
        <ProtectedRoute
          path="/host/event"
          allowedRoles={"host"}
          component={HostEventPage}
          redirected="/host/signin"
        />
        <ProtectedRoute
          path="/host/history"
          allowedRoles={"host"}
          component={HostHistoryPage}
          redirected="/host/signin"
        />

        {/* Venue Routes */}
        <Route exact path="/venue">
          <Redirect to="/venue/home" />
        </Route>
        <ProtectedRoute
          path="/venue/profile"
          allowedRoles={"venue"}
          component={VenueProfilePage}
          redirected="/venue/signin"
        />
        <ProtectedRoute
          path="/venue/home"
          allowedRoles={"venue"}
          component={VenueHomePage}
          redirected="/venue/signin"
        />
        <ProtectedRoute
          path="/venue/history"
          allowedRoles={"venue"}
          component={VenueHistoryPage}
          redirected="/venue/signin"
        />
        <ProtectedRoute
          path="/venue/requests"
          allowedRoles={"venue"}
          component={VenueRequestsPage}
          redirected="/venue/signin"
        />
        <ProtectedRoute
          path="/venue/booked-events"
          allowedRoles={"venue"}
          component={VenueBookedEventsPage}
          redirected="/venue/signin"
        />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
export default RouteService;
