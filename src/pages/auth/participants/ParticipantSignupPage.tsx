import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import React from "react";
import ParticipantSignupComponent from "../../../components/auth/participant/ParticipantSignupComponent";

function ParticipantSignupPage() {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <ParticipantSignupComponent />
      </IonContent>
    </IonPage>
  );
}

export default ParticipantSignupPage;
