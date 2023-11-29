import {
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import NavMenu from "../../components/menus/ParticipantNavMenu";

const ParticipantEventPage = () => {
  return (
    <IonPage>
      <NavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>My Events</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default ParticipantEventPage;
