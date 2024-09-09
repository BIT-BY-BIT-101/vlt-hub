import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import VenueSignupComponent from "../../../components/auth/venue/VenueSignupComponent";
import Header from "../../../components/header/Header";

export default function VenueSignupPage() {
  return (
    <IonPage id="main">
      {/* <Header /> */}
      <IonContent fullscreen className="ion-padding">
        <VenueSignupComponent />
      </IonContent>
    </IonPage>
  );
}
