import React from "react";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const VenueAddVenuePage = () => {
  return (
    <>
      <VenueNavMenu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>

            <IonTitle>Venues</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    </>
  );
};

export default VenueAddVenuePage;
