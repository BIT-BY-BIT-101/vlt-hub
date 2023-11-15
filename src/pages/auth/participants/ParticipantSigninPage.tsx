import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import ParticipantSigninComponent from "../../../components/auth/participant/ParticipantSigninComponent";

export default function ParticipantSigninPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <ParticipantSigninComponent />
    </IonPage>
  );
}
