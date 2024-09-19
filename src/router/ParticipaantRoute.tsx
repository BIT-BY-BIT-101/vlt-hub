import React from "react";
import { Route, Redirect } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import ParticipantEventPage from "../pages/participant/ParticipantEventPage";
import ParticipantHistoryPage from "../pages/participant/ParticipantHistoryPage";
import ParticipantHomePage from "../pages/participant/ParticipantHomePage";
import ParticipantRegsiteredEventDetailPage from "../pages/participant/ParticipantRegsiteredEventDetailPage";

const ParticipaantRoute = () => {
  return (
    <>
      {/* Participants Routes */}
      <Route exact path="/participant">
        <Redirect to="/participant/home" />
      </Route>

      <Route exact path={"/participant/home"}>
        <ParticipantHomePage />
      </Route>

      {/* <ProtectedRoute
          path="/participant/home"
          allowedRoles={"participant"}
          component={ParticipantHomePage}
          redirected="/participant/signin"
        /> */}
      <ProtectedRoute
        path="/participant/events"
        allowedRoles={"participant"}
        component={ParticipantEventPage}
        redirected="/participant/signin"
      />
      <ProtectedRoute
        path="/participant/event/details/:id"
        allowedRoles={"participant"}
        // component={ParticipantEventDetailPage}
        component={ParticipantRegsiteredEventDetailPage}
        redirected="/participant/signin"
      />
      <ProtectedRoute
        path="/participant/history"
        allowedRoles={"participant"}
        component={ParticipantHistoryPage}
        redirected="/participant/signin"
      />
    </>
  );
};

export default ParticipaantRoute;
