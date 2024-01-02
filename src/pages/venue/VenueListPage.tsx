import React from "react";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const VenueListPage = () => {
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
        <IonContent>
          <IonButton>Add Venue</IonButton>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>SMX Convention Center</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueListPage;
