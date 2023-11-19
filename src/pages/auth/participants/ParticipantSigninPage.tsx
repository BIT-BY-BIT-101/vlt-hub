import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import ParticipantSigninComponent from "../../../components/auth/participant/ParticipantSigninComponent";

export default function ParticipantSigninPage() {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <ParticipantSigninComponent />
      </IonContent>
    </IonPage>
  );
}
