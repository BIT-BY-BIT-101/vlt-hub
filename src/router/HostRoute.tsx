import React from "react";
import { Route, Redirect } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import HostCreatePage from "../pages/host/HostCreatePage";
import HostEventListPage from "../pages/host/HostEventListPage";
import HostEventPage from "../pages/host/HostEventPage";
import HostHistoryPage from "../pages/host/HostHistoryPage";
import HostHomePage from "../pages/host/HostHomePage";
import HostVenueSelectionPage from "../pages/host/HostVenueSelectionPage";

const HostRoute = () => {
  return (
    <>
      {/* Host Routes */}
      <Route exact path="/host">
        <Redirect to="/host/home" />
      </Route>
      <ProtectedRoute
        path="/host/home"
        allowedRoles={"host"}
        component={HostHomePage}
        redirected="/host/signin"
      />
      <ProtectedRoute
        path="/host/event-list"
        allowedRoles={"host"}
        component={HostEventListPage}
        redirected="/host/signin"
      />
      <ProtectedRoute
        path="/host/venue-list"
        allowedRoles={"host"}
        component={HostVenueSelectionPage}
        redirected="/host/signin"
      />
      <ProtectedRoute
        path="/host/create"
        // path="/host/:id/create"
        allowedRoles={"host"}
        component={HostCreatePage}
        redirected="/host/signin"
      />
      <ProtectedRoute
        path="/host/:id/edit"
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
    </>
  );
};

export default HostRoute;
