import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import VenueSignupComponent from "../../../components/auth/venue/VenueSignupComponent";

export default function VenueSignupPage() {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <VenueSignupComponent />
      </IonContent>
    </IonPage>
  );
}
