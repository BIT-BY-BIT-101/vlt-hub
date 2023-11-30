import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import HostSigninComponent from "../../../components/auth/host/HostSigninComponent";

function HostSigninPage() {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <HostSigninComponent />
      </IonContent>
    </IonPage>
  );
}

export default HostSigninPage;
