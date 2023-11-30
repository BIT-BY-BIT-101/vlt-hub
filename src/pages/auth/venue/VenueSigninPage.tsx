import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import VenueSigninComponent from "../../../components/auth/venue/VenueSigninComponent";

export default function VenueSigninPage() {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <VenueSigninComponent />
      </IonContent>
    </IonPage>
  );
}
