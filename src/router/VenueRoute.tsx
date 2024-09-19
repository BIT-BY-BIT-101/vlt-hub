import React from "react";
import { Route, Redirect } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import TransactionPage from "../pages/payment/TransactionPage";
import VenueAddFacilityPage from "../pages/venue/VenueAddFacilityPage";
import VenueAddVenuePage from "../pages/venue/VenueAddVenuePage";
import VenueBookedEventsPage from "../pages/venue/VenueBookedEventsPage";
import VenueEditVenuePage from "../pages/venue/VenueEditVenuePage";
import VenueHistoryPage from "../pages/venue/VenueHistoryPage";
import VenueHomePage from "../pages/venue/VenueHomePage";
import VenueListPage from "../pages/venue/VenueListPage";
import VenueRequestsPage from "../pages/venue/VenueRequestsPage";

const VenueRoute = () => {
  return (
    <>
      {/* Venue Routes */}
      <Route exact path="/venue">
        <Redirect to="/venue/home" />
      </Route>

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
        path="/venue/transactions"
        allowedRoles={"venue"}
        component={TransactionPage}
        redirected="/venue/signin"
      />
      <ProtectedRoute
        path="/venue/booked-events"
        allowedRoles={"venue"}
        component={VenueBookedEventsPage}
        redirected="/venue/signin"
      />
      <ProtectedRoute
        path="/venue/list-venue"
        allowedRoles={"venue"}
        component={VenueListPage}
        redirected="/venue/signin"
      />
      <ProtectedRoute
        path="/venue/add-venue"
        allowedRoles={"venue"}
        component={VenueAddVenuePage}
        redirected="/venue/signin"
      />
      <ProtectedRoute
        path="/venue/add-room"
        allowedRoles={"venue"}
        component={VenueAddFacilityPage}
        redirected="/venue/signin"
      />
      <ProtectedRoute
        path="/venue/profile/venue-details/edit"
        allowedRoles={"venue"}
        component={VenueEditVenuePage}
        redirected="/venue/signin"
      />
    </>
  );
};

export default VenueRoute;
