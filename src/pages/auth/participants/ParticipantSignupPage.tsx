import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import React from "react";
import ParticipantSignupComponent from "../../../components/auth/participant/ParticipantSignupComponent";
import ParticipantHeader from "../../../components/participant/ParticipantHeader";
import Header from "../../../components/header/Header";

function ParticipantSignupPage() {
  return (
    <IonPage id="main">
      <Header />
      <IonContent fullscreen className="ion-padding">
        <ParticipantSignupComponent />
      </IonContent>
    </IonPage>
  );
}

export default ParticipantSignupPage;
