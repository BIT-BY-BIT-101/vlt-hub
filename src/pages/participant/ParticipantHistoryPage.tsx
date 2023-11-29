import {
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import NavMenu from "../../components/menus/ParticipantNavMenu";

const ParticipantHistoryPage = () => {
  return (
    <IonPage>
      <NavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default ParticipantHistoryPage;
