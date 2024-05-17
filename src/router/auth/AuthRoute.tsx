import React from "react";
import { Route } from "react-router-dom";
import ParticipantSigninPage from "../../pages/auth/participants/ParticipantSigninPage";
import ParticipantSignupPage from "../../pages/auth/participants/ParticipantSignupPage";
import HostSignupPage from "../../pages/auth/host/HostSignupPage";
import HostSigninPage from "../../pages/auth/host/HostSigninPage";
import VenueSigninPage from "../../pages/auth/venue/VenueSigninPage";
import VenueSignupPage from "../../pages/auth/venue/VenueSignupPage";

export const AuthRoute = () => {
  return (
    <>
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
    </>
  );
};
