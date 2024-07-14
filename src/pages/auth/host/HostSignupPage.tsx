import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import HostSignupComponent from "../../../components/auth/host/HostSignupComponent";
import Header from "../../../components/header/Header";

function ParticipantSignupPage() {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="ion-padding">
        <HostSignupComponent />
      </IonContent>
    </IonPage>
  );
}

export default ParticipantSignupPage;
