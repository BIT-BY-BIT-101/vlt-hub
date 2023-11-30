import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import HostSignupComponent from "../../../components/auth/host/HostSignupComponent";

function ParticipantSignupPage() {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <HostSignupComponent />
      </IonContent>
    </IonPage>
  );
}

export default ParticipantSignupPage;
