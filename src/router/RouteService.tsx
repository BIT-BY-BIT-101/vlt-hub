import { IonRouterOutlet, isPlatform } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import HostSigninPage from "../pages/auth/host/HostSigninPage";
import HostSignupPage from "../pages/auth/host/HostSignupPage";
import ParticipantSigninPage from "../pages/auth/participants/ParticipantSigninPage";
import ParticipantSignupPage from "../pages/auth/participants/ParticipantSignupPage";
import VenueSigninPage from "../pages/auth/venue/VenueSigninPage";
import VenueSignupPage from "../pages/auth/venue/VenueSignupPage";
import ParticipantEventPage from "../pages/participant/ParticipantEventPage";
import ParticipantHistoryPage from "../pages/participant/ParticipantHistoryPage";
import ParticipantHomePage from "../pages/participant/ParticipantHomePage";
import VenueBookedEventsPage from "../pages/venue/VenueBookedEventsPage";
import VenueHistoryPage from "../pages/venue/VenueHistoryPage";
import VenueHomePage from "../pages/venue/VenueHomePage";
import { VenueProfilePage } from "../pages/venue/VenueProfilePage";
import VenueRequestsPage from "../pages/venue/VenueRequestsPage";
import { ParticipantProfilePage } from "../pages/participant/ParticipantProfilePage";
import VenueListPage from "../pages/venue/VenueListPage";
import VenueAddVenuePage from "../pages/venue/VenueAddVenuePage";
import Forms from "../components/experiment/Forms";
import PageNotFound from "../pages/error_pages/PageNotFound";
import { ChatPage } from "../pages/chat/ChatPage";
import SuccessPage from "../pages/payment/SuccessPage";
import Loader from "../components/loaders/Loader";
import VenueEditVenuePage from "../pages/venue/VenueEditVenuePage";
import VenueAddFacilityPage from "../pages/venue/VenueAddFacilityPage";
import TransactionPage from "../pages/payment/TransactionPage";
import HostCreatePage from "../pages/host/HostCreatePage";
import HostEventListPage from "../pages/host/HostEventListPage";
import HostEventPage from "../pages/host/HostEventPage";
import HostHistoryPage from "../pages/host/HostHistoryPage";
import HostHomePage from "../pages/host/HostHomePage";
import { HostProfilePage } from "../pages/host/HostProfilePage";
import HostVenueSelectionPage from "../pages/host/HostVenueSelectionPage";
import ParticipantEventSearch from "../pages/participant/ParticipantEventSearch";
import HostEventDetailPage from "../pages/host/HostEventDetailPage";
import { Host } from "ionicons/dist/types/stencil-public-runtime";
import HostEditEventPage from "../pages/host/HostEditEventPage";

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
          {isPlatform("android") ? (
            <Redirect to="/home/events" />
          ) : (
            <HomePage />
          )}
        </Route>
        <Route exact path="/home/events">
          <ParticipantHomePage />
        </Route>

        <Route render={() => <PageNotFound />} />

        <Route exact path="/">
          <Redirect to="/home" />
          {/* <Redirect to="/participant/signin" /> */}
        </Route>

        {/* Testing */}
        <Route exact path="/test">
          <Forms />
        </Route>
        <Route exact path="/loading">
          <Loader />
        </Route>

        {/* Profiles */}
        <ProtectedRoute
          path="/participant/profile"
          allowedRoles={"participant"}
          component={ParticipantProfilePage}
          redirected="/participant/signin"
        />
        <ProtectedRoute
          path="/host/profile"
          allowedRoles={"host"}
          component={HostProfilePage}
          redirected="/host/signin"
        />
        <ProtectedRoute
          path="/venue/profile"
          allowedRoles={"venue"}
          component={VenueProfilePage}
          redirected="/venue/signin"
        />

        {/* Participants Routes */}
        <Route exact path="/participant">
          <Redirect to="/participant/home" />
        </Route>
        <Route exact path="/participant/search">
          <ParticipantEventSearch />
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
          component={HostEventDetailPage}
          // component={ParticipantRegsiteredEventDetailPage}
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
        <ProtectedRoute
          path="/host/event/details/:id"
          allowedRoles={"host"}
          component={HostEventDetailPage}
          // component={ParticipantRegsiteredEventDetailPage}
          redirected="/host/signin"
        />
        <ProtectedRoute
          path="/host/event/:id/edit"
          allowedRoles={"host"}
          component={HostEditEventPage}
          redirected="/host/signin"
        />

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

        {/* Chat */}
        <ProtectedRoute
          path="/venue/chat/:id/messages"
          allowedRoles={"venue"}
          component={ChatPage}
          redirected="/venue/signin"
        />
        <ProtectedRoute
          path="/participant/chat/:id/messages"
          allowedRoles={"participant"}
          component={ChatPage}
          redirected="/participant/signin"
        />
        <ProtectedRoute
          path="/host/chat/:id/messages"
          allowedRoles={"host"}
          component={ChatPage}
          redirected="/host/signin"
        />

        {/* Payments */}
        {/* Participant */}
        <ProtectedRoute
          path="/participant/payments/:id/success"
          allowedRoles={"participant"}
          component={SuccessPage}
          redirected="/participant/signin"
        />
        {/* Host */}
        <ProtectedRoute
          path="/host/payments/:id/success"
          allowedRoles={"host"}
          component={SuccessPage}
          redirected="/participant/signin"
        />
        {/* Venue */}
        <ProtectedRoute
          path="/venue/payments/:id/success"
          allowedRoles={"venue"}
          component={SuccessPage}
          redirected="/participant/signin"
        />

        {/* <Route path="*" component={PageNotFound} /> */}
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
export default RouteService;
