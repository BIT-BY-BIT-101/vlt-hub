import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import VenueSigninComponent from "../../../components/auth/venue/VenueSigninComponent";
import Header from "../../../components/header/Header";
import Menus from "../../../components/menus/Menus";

export default function VenueSigninPage() {
  return (
    <>
      {/* <Menus /> */}
      <IonPage id="main">
        {/* <Header /> */}
        <IonContent fullscreen className="ion-padding">
          <VenueSigninComponent />
        </IonContent>
      </IonPage>
    </>
  );
}
