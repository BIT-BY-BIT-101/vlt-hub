import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import HostSigninComponent from "../../../components/auth/host/HostSigninComponent";
import Header from "../../../components/header/Header";
import Menus from "../../../components/menus/Menus";
import ParticipantNavMenu from "../../../components/menus/ParticipantNavMenu";

function HostSigninPage() {
  return (
    <IonPage id="main">
      <Header />
      <IonContent fullscreen className="ion-padding">
        <HostSigninComponent />
      </IonContent>
    </IonPage>
  );
}

export default HostSigninPage;
